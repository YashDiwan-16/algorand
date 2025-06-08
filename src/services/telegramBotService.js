import TelegramBot from 'node-telegram-bot-api';
import { createConsentRequest, getConsentRequests, updateConsentRequest, getConsentRequest } from './consentService.js';
import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize bot with your token
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', { polling: true });

// Store user states for multi-step interactions
const userStates = {
  setAddress: new Map(),
  requestConsent: new Map(),
  grantConsent: new Map()
};
const userWallets = new Map(); // Map Telegram user ID to wallet address

// Document types available in the system
const documentTypes = [
  { id: 'aadhar', name: 'Aadhar Card', icon: '🪪' },
  { id: 'pan', name: 'PAN Card', icon: '💳' },
  { id: 'driving', name: 'Driving License', icon: '🚗' },
  { id: 'passport', name: 'Passport', icon: '📘' },
  { id: 'medical', name: 'Medical Records', icon: '🏥' },
  { id: 'bank', name: 'Bank Statements', icon: '🏦' },
  { id: 'property', name: 'Property Documents', icon: '🏠' },
  { id: 'education', name: 'Educational Certificates', icon: '🎓' },
  { id: 'employment', name: 'Employment Records', icon: '💼' },
  { id: 'legal', name: 'Legal Documents', icon: '⚖️' },
  { id: 'tax', name: 'Tax Documents', icon: '📊' },
  { id: 'voter', name: 'Voter ID', icon: '🗳️' },
  { id: 'other', name: 'Others', icon: '📄' }
];

// Add Pinata configuration
const PINATA_API_KEY = process.env.PINATA_API_KEY || '';
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY || '';

// Add Pinata upload function
async function uploadToPinata(fileBuffer, fileName) {
  try {
    const formData = new FormData();
    formData.append('file', fileBuffer, {
      filename: fileName,
      contentType: 'application/octet-stream'
    });

    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_KEY
      }
    });

    return response.data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw error;
  }
}

// Prompt for wallet address on /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  if (!userWallets.has(chatId)) {
    userStates.setAddress.set(chatId, { step: 'set_wallet' });
    bot.sendMessage(chatId, 'Welcome to ConsentBot!\n\nPlease enter your wallet address to get started:');
  } else {
    sendWelcome(chatId);
  }
});

// Set wallet address manually
bot.onText(/\/setaddress/, (msg) => {
  const chatId = msg.chat.id;
  userStates.setAddress.set(chatId, { step: 'set_wallet' });
  bot.sendMessage(chatId, 'Please enter your wallet address:');
});

function sendWelcome(chatId) {
  const welcomeMessage = `
Welcome to ConsentBot! 🤖

I can help you manage your document consent requests. Here's what you can do:

📥 /request - Request document consent
📤 /grant - Grant consent for a request
❌ /revoke - Revoke granted consent
📋 /history - View your consent history
📊 /dashboard - View your dashboard
/setaddress - Set or update your wallet address
❓ /help - Show this help message

To get started, use /request to create a new consent request.`;
  bot.sendMessage(chatId, welcomeMessage);
}

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
Here's how to use ConsentBot:

1. Set your wallet address with /setaddress
2. Request Consent: /request
3. Grant Consent: /grant
4. Revoke Consent: /revoke
5. View History: /history
6. Dashboard: /dashboard
`;
  bot.sendMessage(chatId, helpMessage);
});

// Request consent flow
bot.onText(/\/request/, async (msg) => {
  const chatId = msg.chat.id;
  if (!userWallets.has(chatId)) {
    userStates.setAddress.set(chatId, { step: 'set_wallet' });
    bot.sendMessage(chatId, 'Please enter your wallet address before making a request:');
    return;
  }
  userStates.requestConsent.set(chatId, { step: 'select_document' });
  const keyboard = {
    inline_keyboard: documentTypes.map(doc => [{
      text: `${doc.icon} ${doc.name}`,
      callback_data: `doc_${doc.id}`
    }])
  };
  bot.sendMessage(chatId, 'Select the document type you want to request:', { reply_markup: keyboard });
});

// Handle document selection and grant/revoke actions
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  console.log('Callback query received:', { chatId, data });

  if (data.startsWith('doc_')) {
    const docType = data.replace('doc_', '');
    const state = userStates.requestConsent.get(chatId) || {};
    state.selectedDoc = docType;
    state.step = 'enter_recipient';
    userStates.requestConsent.set(chatId, state);
    bot.sendMessage(chatId, 'Please enter the recipient\'s wallet address:');
  } else if (data.startsWith('grant_')) {
    const requestId = data.replace('grant_', '');
    try {
      await updateConsentRequest(requestId, { status: 'granted' });
      bot.sendMessage(chatId, '✅ Consent granted successfully!');
    } catch (error) {
      bot.sendMessage(chatId, '❌ Error granting consent. Please try again.');
    }
  } else if (data.startsWith('revoke_')) {
    const requestId = data.replace('revoke_', '');
    try {
      await updateConsentRequest(requestId, { status: 'revoked' });
      bot.sendMessage(chatId, '✅ Consent revoked successfully!');
    } catch (error) {
      bot.sendMessage(chatId, '❌ Error revoking consent. Please try again.');
    }
  } else if (data.startsWith('start_grant_')) {
    const requestId = data.split('_')[2];
    console.log('Starting grant process for request:', requestId);
    
    // Initialize grant state
    userStates.grantConsent.set(chatId, {
      requestId,
      step: 'upload_document',
      document: null,
      expiry: null,
      permissions: {
        view: true,
        edit: false,
        download: false,
        screenshot: false
      }
    });
    console.log('Grant state initialized:', userStates.grantConsent.get(chatId));

    await bot.sendMessage(chatId, 
      '📄 Please upload the document file for this consent request.\n' +
      'Supported formats: PDF, JPG, PNG\n\n' +
      'Send the file or type /cancel to abort.'
    );
  }
  else if (data.startsWith('set_expiry_')) {
    const [_, __, type, requestId, days] = data.split('_');
    const state = userStates.grantConsent.get(chatId);
    
    if (state) {
      if (type === 'custom') {
        // Set state to wait for custom date input
        state.step = 'enter_custom_date';
        await bot.sendMessage(chatId, 
          '📅 Please enter the expiry date and time in DD/MM/YYYY HH:mm format.\n\n' +
          'Example: 31/12/2024 15:30\n\n' +
          'The time should be in 24-hour format.'
        );
      } else {
        // Handle preset durations
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(days));
        state.expiry = expiryDate;
        state.step = 'set_permissions';
        
        // Show permissions keyboard
        const keyboard = {
          inline_keyboard: [
            [{
              text: `${state.permissions.view ? '✅' : '❌'} View Document`,
              callback_data: `toggle_perm_${state.requestId}_view`
            }],
            [{
              text: `${state.permissions.edit ? '✅' : '❌'} Edit Document`,
              callback_data: `toggle_perm_${state.requestId}_edit`
            }],
            [{
              text: `${state.permissions.download ? '✅' : '❌'} Download Document`,
              callback_data: `toggle_perm_${state.requestId}_download`
            }],
            [{
              text: `${state.permissions.screenshot ? '✅' : '❌'} Take Screenshots`,
              callback_data: `toggle_perm_${state.requestId}_screenshot`
            }],
            [{
              text: '✅ Confirm Permissions',
              callback_data: `confirm_perms_${state.requestId}`
            }]
          ]
        };
        
        await bot.sendMessage(chatId, 
          '🔒 Set permissions for this consent:\n\n' +
          'Click on each permission to toggle it on/off.\n' +
          'When done, click "Confirm Permissions" to proceed.',
          { reply_markup: keyboard }
        );
      }
    }
  }
  else if (data.startsWith('toggle_perm_')) {
    const [_, __, requestId, perm] = data.split('_');
    const state = userStates.grantConsent.get(chatId);
    if (state) {
      state.permissions[perm] = !state.permissions[perm];
      
      // Update permissions keyboard
      const keyboard = {
        inline_keyboard: [
          [{
            text: `${state.permissions.view ? '✅' : '❌'} View Document`,
            callback_data: `toggle_perm_${requestId}_view`
          }],
          [{
            text: `${state.permissions.edit ? '✅' : '❌'} Edit Document`,
            callback_data: `toggle_perm_${requestId}_edit`
          }],
          [{
            text: `${state.permissions.download ? '✅' : '❌'} Download Document`,
            callback_data: `toggle_perm_${requestId}_download`
          }],
          [{
            text: `${state.permissions.screenshot ? '✅' : '❌'} Take Screenshots`,
            callback_data: `toggle_perm_${requestId}_screenshot`
          }],
          [{
            text: '✅ Confirm Permissions',
            callback_data: `confirm_perms_${requestId}`
          }]
        ]
      };
      
      await bot.editMessageReplyMarkup(keyboard, {
        chat_id: chatId,
        message_id: query.message.message_id
      });
    }
  }
  else if (data.startsWith('confirm_perms_')) {
    const requestId = data.split('_')[2];
    const state = userStates.grantConsent.get(chatId);
    if (state) {
      try {
        // Grant consent with all collected information
        const response = await fetch(`http://localhost:5001/api/consent/${requestId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'granted',
            grantedAt: new Date().toISOString(),
            expiry: state.expiry.toISOString(),
            permissions: state.permissions,
            document: {
              name: state.document.name,
              type: state.document.type,
              ipfsHash: state.document.ipfsHash
            }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to grant consent');
        }

        await bot.sendMessage(chatId, 
          '✅ Consent granted successfully!\n\n' +
          'Document has been shared with the following permissions:\n' +
          `- View: ${state.permissions.view ? 'Yes' : 'No'}\n` +
          `- Edit: ${state.permissions.edit ? 'Yes' : 'No'}\n` +
          `- Download: ${state.permissions.download ? 'Yes' : 'No'}\n` +
          `- Screenshots: ${state.permissions.screenshot ? 'Yes' : 'No'}\n\n` +
          `Expiry: ${state.expiry.toLocaleString()}\n\n` +
          `Document IPFS Hash: ${state.document.ipfsHash}`
        );

        // Clear the grant state
        userStates.grantConsent.delete(chatId);
      } catch (error) {
        console.error('Error granting consent:', error);
        await bot.sendMessage(chatId, '❌ Error granting consent. Please try again.');
      }
    }
  }
});

// Handle text messages for multi-step flows
bot.on('message', async (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  const chatId = msg.chat.id;
  console.log('Message received:', {
    chatId,
    text: msg.text,
    document: msg.document,
    state: userStates.requestConsent.get(chatId)
  });

  // Handle wallet address setting
  const setAddressState = userStates.setAddress.get(chatId);
  if (setAddressState && setAddressState.step === 'set_wallet') {
    userWallets.set(chatId, msg.text.trim());
    userStates.setAddress.delete(chatId);
    bot.sendMessage(chatId, `✅ Wallet address set to: ${msg.text.trim()}`);
    sendWelcome(chatId);
    return;
  }

  // Handle request consent flow
  const requestState = userStates.requestConsent.get(chatId);
  if (requestState) {
    switch (requestState.step) {
    case 'enter_recipient':
        requestState.recipient = msg.text.trim();
        requestState.step = 'enter_reason';
        userStates.requestConsent.set(chatId, requestState);
      bot.sendMessage(chatId, 'Please enter the reason for requesting this document:');
      break;
    case 'enter_reason':
      try {
        const sender = userWallets.get(chatId);
        const request = await createConsentRequest({
            documentTypes: [requestState.selectedDoc],
            recipient: requestState.recipient,
          reason: msg.text.trim(),
          sender,
          requestId: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString(),
          permissions: {
            view: true,
            edit: false,
            download: false,
            screenshot: false
          }
        });
        
        // Generate QR code for the request URL
        const qrCodeUrl = `http://localhost:3000/consent/${request.requestId}`;
        const tempDir = path.join(__dirname, '../temp');
        
        // Ensure temp directory exists
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        
        const qrPath = path.join(tempDir, `qr_${request.requestId}.png`);
        await QRCode.toFile(qrPath, qrCodeUrl, { width: 300 });
        
        // Send confirmation with QR code
          bot.sendMessage(chatId, `✅ Consent request created successfully!\n\nRequest ID: ${request.requestId}\nDocument: ${documentTypes.find(d => d.id === requestState.selectedDoc)?.name}\nRecipient: ${requestState.recipient}\nReason: ${msg.text.trim()}\n\nShare this QR code with the recipient to grant consent.`);
        await bot.sendPhoto(chatId, qrPath, { caption: 'Scan this QR code to view the consent request.' });
        
        // Clean up temp QR file
        fs.unlink(qrPath, () => {});
        userStates.requestConsent.delete(chatId);
      } catch (error) {
        console.error('Error creating consent request:', error);
        bot.sendMessage(chatId, `❌ Error creating consent request: ${error.message}. Please try again.`);
      }
      break;
    }
  }
});

// History command
bot.onText(/\/history/, async (msg) => {
  const chatId = msg.chat.id;
  if (!userWallets.has(chatId)) {
    bot.sendMessage(chatId, 'Please set your wallet address first using /setaddress');
    return;
  }
  try {
    const requests = await getConsentRequests(userWallets.get(chatId));
    if (requests.length === 0) {
      bot.sendMessage(chatId, 'No consent requests found.');
      return;
    }

    // Group requests by status
    const pendingRequests = requests.filter(req => req.status === 'pending');
    const grantedRequests = requests.filter(req => req.status === 'granted');
    const revokedRequests = requests.filter(req => req.status === 'revoked');

    // Send summary first
    const summary = `
📋 Consent History Summary:
Pending: ${pendingRequests.length}
Granted: ${grantedRequests.length}
Revoked: ${revokedRequests.length}
`;
    await bot.sendMessage(chatId, summary);

    // Send each request separately to avoid message length limits
    if (pendingRequests.length > 0) {
      await bot.sendMessage(chatId, '📥 Pending Requests:');
      for (const req of pendingRequests) {
        const message = `
⏳ Request ID: ${req.requestId}
From: ${req.sender}
Document: ${req.documentTypes.join(', ') || 'Not specified'}
Reason: ${req.reason}
Created: ${new Date(req.createdAt).toLocaleString()}
-------------------`;
        await bot.sendMessage(chatId, message);
      }
    }

    if (grantedRequests.length > 0) {
      await bot.sendMessage(chatId, '✅ Granted Requests:');
      for (const req of grantedRequests) {
        const message = `
Request ID: ${req.requestId}
From: ${req.sender}
Document: ${req.documentTypes.join(', ') || 'Not specified'}
Reason: ${req.reason}
Granted: ${new Date(req.grantedAt).toLocaleString()}
-------------------`;
        await bot.sendMessage(chatId, message);
      }
    }

    if (revokedRequests.length > 0) {
      await bot.sendMessage(chatId, '❌ Revoked Requests:');
      for (const req of revokedRequests) {
        const message = `
Request ID: ${req.requestId}
From: ${req.sender}
Document: ${req.documentTypes.join(', ') || 'Not specified'}
Reason: ${req.reason}
Revoked: ${new Date(req.revokedAt).toLocaleString()}
-------------------`;
        await bot.sendMessage(chatId, message);
      }
    }
  } catch (error) {
    console.error('Error fetching consent history:', error);
    bot.sendMessage(chatId, '❌ Error fetching consent history. Please try again.');
  }
});

// Dashboard command
bot.onText(/\/dashboard/, async (msg) => {
  const chatId = msg.chat.id;
  if (!userWallets.has(chatId)) {
    bot.sendMessage(chatId, 'Please set your wallet address first using /setaddress');
    return;
  }
  try {
    const requests = await getConsentRequests(userWallets.get(chatId));
    const pending = requests.filter(r => r.status === 'pending').length;
    const granted = requests.filter(r => r.status === 'granted').length;
    const revoked = requests.filter(r => r.status === 'revoked').length;
    
    const message = `
📊 Your Consent Dashboard

Pending Requests: ${pending}
Granted Consents: ${granted}
Revoked Consents: ${revoked}

Use /history to view detailed information about your consent requests.`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error fetching dashboard data. Please try again.');
  }
});

// Grant consent
bot.onText(/\/grant/, async (msg) => {
  const chatId = msg.chat.id;
  if (!userWallets.has(chatId)) {
    bot.sendMessage(chatId, 'Please set your wallet address first using /setaddress');
    return;
  }
  try {
    const requests = await getConsentRequests(userWallets.get(chatId));
    const pendingRequests = requests.filter(r => r.status === 'pending');
    
    if (pendingRequests.length === 0) {
      bot.sendMessage(chatId, 'No pending requests to grant.');
      return;
    }
    
    // Send summary first
    await bot.sendMessage(chatId, `📥 You have ${pendingRequests.length} pending request(s):`);
    
    // Send each request separately with details
    for (const req of pendingRequests) {
      const message = `
🔔 New Consent Request:
From: ${req.sender}
Document: ${req.documentTypes.join(', ') || 'Not specified'}
Reason: ${req.reason}
Created: ${new Date(req.createdAt).toLocaleString()}

Click the button below to start granting consent.`;
      
      const keyboard = {
        inline_keyboard: [[{
          text: '✅ Start Grant Process',
          callback_data: `start_grant_${req.requestId}`
        }]]
      };
      
      await bot.sendMessage(chatId, message, { reply_markup: keyboard });
    }
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    bot.sendMessage(chatId, '❌ Error fetching pending requests. Please try again.');
  }
});

// Revoke consent
bot.onText(/\/revoke/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const requests = await getConsentRequests(chatId.toString());
    const grantedRequests = requests.filter(r => r.status === 'granted');
    
    if (grantedRequests.length === 0) {
      bot.sendMessage(chatId, 'No granted requests to revoke.');
      return;
    }
    
    const keyboard = {
      inline_keyboard: grantedRequests.map(req => [{
        text: `${documentTypes.find(d => d.id === req.documentType)?.name} - ${req.requestId}`,
        callback_data: `revoke_${req.requestId}`
      }])
    };
    
    bot.sendMessage(chatId, 'Select a request to revoke:', { reply_markup: keyboard });
  } catch (error) {
    bot.sendMessage(chatId, '❌ Error fetching granted requests. Please try again.');
  }
});

// Update the document handler
bot.on('document', async (msg) => {
  const chatId = msg.chat.id;
  console.log('Document received:', {
    chatId,
    document: msg.document,
    state: userStates.grantConsent.get(chatId)
  });

  const state = userStates.grantConsent.get(chatId);
  
  if (!state) {
    console.log('No active grant state found for chatId:', chatId);
    await bot.sendMessage(chatId, '❌ No active grant process. Please use /grant to start.');
    return;
  }

  if (state.step !== 'upload_document') {
    console.log('Invalid step:', state.step);
    await bot.sendMessage(chatId, '❌ Invalid step. Please use /cancel and try again.');
    return;
  }

  try {
    if (!msg.document) {
      console.log('No document in message');
      await bot.sendMessage(chatId, '❌ No document found. Please try uploading again.');
      return;
    }

    const file = msg.document;
    console.log('Processing file:', file);

    if (!file.file_name) {
      console.log('No filename in document');
      await bot.sendMessage(chatId, '❌ Invalid document format. Please try uploading again.');
      return;
    }

    const fileExtension = file.file_name.split('.').pop().toLowerCase();
    console.log('File extension:', fileExtension);
    
    if (!['pdf', 'jpg', 'jpeg', 'png'].includes(fileExtension)) {
      await bot.sendMessage(chatId, 
        '❌ Unsupported file format. Please upload a PDF, JPG, or PNG file.'
      );
      return;
    }

    // Get file from Telegram
    console.log('Getting file stream for:', file.file_id);
    const fileStream = bot.getFileStream(file.file_id);
    if (!fileStream) {
      console.log('Failed to get file stream');
      await bot.sendMessage(chatId, '❌ Failed to process document. Please try uploading again.');
      return;
    }

    const chunks = [];
    console.log('Reading file stream...');
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    console.log('File read complete, size:', buffer.length);

    if (buffer.length === 0) {
      console.log('Empty file buffer');
      await bot.sendMessage(chatId, '❌ Document is empty. Please try uploading again.');
      return;
    }

    // Upload to Pinata
    console.log('Uploading to Pinata...');
    await bot.sendMessage(chatId, '⏳ Uploading document to IPFS...');
    
    try {
      const ipfsHash = await uploadToPinata(buffer, file.file_name);
      console.log('Upload complete, IPFS hash:', ipfsHash);

      // Store document info in state
      state.document = {
        name: file.file_name,
        type: file.mime_type,
        ipfsHash: ipfsHash
      };
      state.step = 'set_expiry';
      console.log('Document stored in state, moving to expiry selection');

      // Update the expiry options keyboard
      const keyboard = {
        inline_keyboard: [
          [{
            text: '1 Day',
            callback_data: `set_expiry_${state.requestId}_1`
          }],
          [{
            text: '7 Days',
            callback_data: `set_expiry_${state.requestId}_7`
          }],
          [{
            text: '30 Days',
            callback_data: `set_expiry_${state.requestId}_30`
          }],
          [{
            text: '90 Days',
            callback_data: `set_expiry_${state.requestId}_90`
          }],
          [{
            text: '📅 Custom Date & Time',
            callback_data: `set_expiry_custom_${state.requestId}`
          }]
        ]
      };

      console.log('Sending expiry options...');
      await bot.sendMessage(chatId, 
        '📅 Select how long this consent should be valid:\n\n' +
        'Or choose "Custom Date & Time" to set a specific expiry.',
        { reply_markup: keyboard }
      );
      console.log('Expiry options sent successfully');
    } catch (uploadError) {
      console.error('Error uploading to Pinata:', uploadError);
      await bot.sendMessage(chatId, '❌ Error uploading document to IPFS. Please try again or use /cancel to abort.');
    }
  } catch (error) {
    console.error('Error handling document:', error);
    await bot.sendMessage(chatId, '❌ Error processing document. Please try again or use /cancel to abort.');
  }
});

// Add photo handler for images
bot.on('photo', async (msg) => {
  const chatId = msg.chat.id;
  console.log('Photo received:', {
    chatId,
    photo: msg.photo,
    state: userStates.grantConsent.get(chatId)
  });

  const state = userStates.grantConsent.get(chatId);
  
  if (!state || state.step !== 'upload_document') {
    return;
  }

  try {
    // Get the largest photo size
    const photo = msg.photo[msg.photo.length - 1];
    console.log('Processing photo:', photo);

    // Get file from Telegram
    console.log('Getting file stream for:', photo.file_id);
    const fileStream = bot.getFileStream(photo.file_id);
    if (!fileStream) {
      console.log('Failed to get file stream');
      await bot.sendMessage(chatId, '❌ Failed to process image. Please try uploading again.');
      return;
    }

    const chunks = [];
    console.log('Reading file stream...');
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);
    console.log('File read complete, size:', buffer.length);

    if (buffer.length === 0) {
      console.log('Empty file buffer');
      await bot.sendMessage(chatId, '❌ Image is empty. Please try uploading again.');
      return;
    }

    // Upload to Pinata
    console.log('Uploading to Pinata...');
    await bot.sendMessage(chatId, '⏳ Uploading image to IPFS...');
    
    try {
      const ipfsHash = await uploadToPinata(buffer, `image_${Date.now()}.jpg`);
      console.log('Upload complete, IPFS hash:', ipfsHash);

      // Store document info in state
      state.document = {
        name: `image_${Date.now()}.jpg`,
        type: 'image/jpeg',
        ipfsHash: ipfsHash
      };
      state.step = 'set_expiry';
      console.log('Document stored in state, moving to expiry selection');

      // Update the expiry options keyboard
      const keyboard = {
        inline_keyboard: [
          [{
            text: '1 Day',
            callback_data: `set_expiry_${state.requestId}_1`
          }],
          [{
            text: '7 Days',
            callback_data: `set_expiry_${state.requestId}_7`
          }],
          [{
            text: '30 Days',
            callback_data: `set_expiry_${state.requestId}_30`
          }],
          [{
            text: '90 Days',
            callback_data: `set_expiry_${state.requestId}_90`
          }],
          [{
            text: '📅 Custom Date & Time',
            callback_data: `set_expiry_custom_${state.requestId}`
          }]
        ]
      };

      console.log('Sending expiry options...');
      await bot.sendMessage(chatId, 
        '📅 Select how long this consent should be valid:\n\n' +
        'Or choose "Custom Date & Time" to set a specific expiry.',
        { reply_markup: keyboard }
      );
      console.log('Expiry options sent successfully');
    } catch (uploadError) {
      console.error('Error uploading to Pinata:', uploadError);
      await bot.sendMessage(chatId, '❌ Error uploading image to IPFS. Please try again or use /cancel to abort.');
    }
  } catch (error) {
    console.error('Error handling photo:', error);
    await bot.sendMessage(chatId, '❌ Error processing image. Please try again or use /cancel to abort.');
  }
});

// Add cancel command
bot.onText(/\/cancel/, async (msg) => {
  const chatId = msg.chat.id;
  if (userStates.grantConsent.has(chatId)) {
    userStates.grantConsent.delete(chatId);
    await bot.sendMessage(chatId, '❌ Grant process cancelled.');
  }
});

// Add error handler for the bot
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

bot.on('error', (error) => {
  console.error('Bot error:', error);
});

// Add message handler for debugging
bot.on('message', (msg) => {
  console.log('Message received:', {
    chatId: msg.chat.id,
    text: msg.text,
    document: msg.document,
    state: userStates.grantConsent.get(msg.chat.id)
  });
});

// Add text message handler for custom date
bot.on('text', async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.grantConsent.get(chatId);
  
  if (!state) return;

  if (state.step === 'enter_custom_date') {
    try {
      // Parse the date string (expected format: DD/MM/YYYY HH:mm)
      const [datePart, timePart] = msg.text.split(' ');
      const [day, month, year] = datePart.split('/');
      const [hours, minutes] = timePart.split(':');

      const expiryDate = new Date(year, month - 1, day, hours, minutes);
      
      // Validate the date
      if (isNaN(expiryDate.getTime())) {
        await bot.sendMessage(chatId, 
          '❌ Invalid date format. Please use DD/MM/YYYY HH:mm format.\n' +
          'Example: 31/12/2024 15:30'
        );
        return;
      }

      // Check if date is in the future
      if (expiryDate <= new Date()) {
        await bot.sendMessage(chatId, 
          '❌ Expiry date must be in the future. Please try again.'
        );
        return;
      }

      // Store the expiry date
      state.expiry = expiryDate;
      state.step = 'set_permissions';

      // Show permissions keyboard
      const keyboard = {
        inline_keyboard: [
          [{
            text: `${state.permissions.view ? '✅' : '❌'} View Document`,
            callback_data: `toggle_perm_${state.requestId}_view`
          }],
          [{
            text: `${state.permissions.edit ? '✅' : '❌'} Edit Document`,
            callback_data: `toggle_perm_${state.requestId}_edit`
          }],
          [{
            text: `${state.permissions.download ? '✅' : '❌'} Download Document`,
            callback_data: `toggle_perm_${state.requestId}_download`
          }],
          [{
            text: `${state.permissions.screenshot ? '✅' : '❌'} Take Screenshots`,
            callback_data: `toggle_perm_${state.requestId}_screenshot`
          }],
          [{
            text: '✅ Confirm Permissions',
            callback_data: `confirm_perms_${state.requestId}`
          }]
        ]
      };

      await bot.sendMessage(chatId, 
        '🔒 Set permissions for this consent:\n\n' +
        'Click on each permission to toggle it on/off.\n' +
        'When done, click "Confirm Permissions" to proceed.',
        { reply_markup: keyboard }
      );
    } catch (error) {
      console.error('Error parsing custom date:', error);
      await bot.sendMessage(chatId, 
        '❌ Error processing date. Please use DD/MM/YYYY HH:mm format.\n' +
        'Example: 31/12/2024 15:30'
      );
    }
  }
});

export default bot; 
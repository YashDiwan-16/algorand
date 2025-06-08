import algosdk from 'algosdk/dist/esm/index.js';

// Algorand Testnet node (Algonode)
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud';
const algodPort = '';
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

// Replace with your deployed app ID
const APP_ID = 740703196;

// Helper function to convert string to Uint8Array
function stringToUint8Array(str) {
  return new Uint8Array(Array.from(str).map(c => c.charCodeAt(0)));
}

export async function requestConsent({ sender, senderSK, documentHash, documentType, requestId, recipient }) {
  try {
    const params = await algodClient.getTransactionParams().do();
    const appArgs = [
      stringToUint8Array('request_consent'),
      stringToUint8Array(documentHash),
      stringToUint8Array(documentType),
      stringToUint8Array(requestId),
      algosdk.decodeAddress(recipient).publicKey
    ];
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, algodClient.appIndex || 740703196, appArgs);
    const signedTxn = txn.signTxn(senderSK);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    await waitForConfirmation(txId);
    return txId;
  } catch (error) {
    console.error('Error in requestConsent:', error);
    throw error;
  }
}

export async function grantConsent({ sender, senderSK, expiry, permissions }) {
  try {
    const params = await algodClient.getTransactionParams().do();
    const appArgs = [
      stringToUint8Array('grant_consent'),
      algosdk.encodeUint64(expiry),
      stringToUint8Array(JSON.stringify(permissions))
    ];
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, algodClient.appIndex || 740703196, appArgs);
    const signedTxn = txn.signTxn(senderSK);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    await waitForConfirmation(txId);
    return txId;
  } catch (error) {
    console.error('Error in grantConsent:', error);
    throw error;
  }
}

export async function viewDocument({ sender, senderSK }) {
  try {
    const params = await algodClient.getTransactionParams().do();
    const appArgs = [stringToUint8Array('view_document')];
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, algodClient.appIndex || 740703196, appArgs);
    const signedTxn = txn.signTxn(senderSK);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    await waitForConfirmation(txId);
    return txId;
  } catch (error) {
    console.error('Error in viewDocument:', error);
    throw error;
  }
}

export async function revokeConsent({ sender, senderSK }) {
  try {
    const params = await algodClient.getTransactionParams().do();
    const appArgs = [stringToUint8Array('revoke_consent')];
    const txn = algosdk.makeApplicationNoOpTxn(sender, params, algodClient.appIndex || 740703196, appArgs);
    const signedTxn = txn.signTxn(senderSK);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    await waitForConfirmation(txId);
    return txId;
  } catch (error) {
    console.error('Error in revokeConsent:', error);
    throw error;
  }
}

async function waitForConfirmation(txId) {
  try {
    let lastRound = (await algodClient.status().do())['last-round'];
    while (true) {
      const pendingInfo = await algodClient.pendingTransactionInformation(txId).do();
      if (pendingInfo['confirmed-round'] && pendingInfo['confirmed-round'] > 0) {
        return pendingInfo;
      }
      lastRound++;
      await algodClient.statusAfterBlock(lastRound).do();
    }
  } catch (error) {
    console.error('Error in waitForConfirmation:', error);
    throw error;
  }
} 
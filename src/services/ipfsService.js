const PINATA_API_KEY = '3f1d7b8d429ea84f7263';
const PINATA_API_SECRET = 'b69c9825904625b797546ae1745851ae0a7508174844519e02d543512eb3dc9e';

export const uploadToIPFS = async (file) => {
  try {
    console.log('Starting Pinata upload for file:', {
      name: file.name,
      size: file.size,
      type: file.type
    });
    
    const formData = new FormData();
    formData.append('file', file);

    // Show uploading status
    console.log('Uploading to Pinata...');

    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_API_SECRET,
        'Accept': '*/*'
      },
      body: formData,
    });

    console.log('Pinata response status:', response.status);
    const responseText = await response.text();
    console.log('Pinata raw response:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Pinata response:', e);
      throw new Error('Invalid response from Pinata');
    }

    if (!response.ok) {
      console.error('Pinata upload failed:', data);
      throw new Error(data.error?.details || data.error?.message || 'Failed to upload to IPFS');
    }

    if (!data.IpfsHash) {
      throw new Error('No IPFS hash received from Pinata');
    }

    console.log('File uploaded successfully to Pinata:', data);
    return data.IpfsHash;
  } catch (error) {
    console.error('Error uploading to Pinata:', error);
    throw new Error(`Failed to upload to IPFS: ${error.message}`);
  }
};

export const getFromIPFS = async (hash) => {
  try {
    console.log('Fetching file from IPFS:', hash);
    
    const response = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from IPFS');
    }

    const data = await response.blob();
    return data;
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw new Error(`Failed to fetch from IPFS: ${error.message}`);
  }
};

export const getIPFSGatewayURL = (hash) => {
  return `https://gateway.pinata.cloud/ipfs/${hash}`;
}; 
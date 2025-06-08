import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const fetchWithRetry = async (url, options, retries = 3) => {
  try {
    const response = await fetch(url, options);
    return await handleResponse(response);
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying request to ${url}. Attempts left: ${retries - 1}`);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retry
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
};

export const storeConsentRequest = async (request) => {
  try {
    const response = await axios.post(`${API_URL}/consent`, {
      ...request,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error('Error storing consent request:', error);
    throw error;
  }
};

export const getConsentRequests = async (address, type = 'all') => {
  try {
    console.log(`Fetching ${type} consent requests for address:`, address);
    
    const response = await fetch(`${API_URL}/consent/user/${address}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Received ${type} consent requests:`, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${type} consent requests:`, error);
    throw error;
  }
};

export const getConsentRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/consent/${requestId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch consent request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching consent request:', error);
    throw error;
  }
};

export const updateConsentRequest = async (requestId, updates) => {
  try {
    const response = await fetch(`${API_URL}/consent/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error('Failed to update consent request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating consent request:', error);
    throw error;
  }
};

export const createConsentRequest = async (requestData) => {
  try {
    const response = await fetch(`${API_URL}/consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(requestData)
    });

    if (!response.ok) {
      throw new Error('Failed to create consent request');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating consent request:', error);
    throw error;
  }
};

export const getDocuments = async (address) => {
  try {
    const response = await axios.get(`${API_URL}/documents/${address}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocument = async (documentId) => {
  try {
    const response = await axios.get(`${API_URL}/documents/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};

export const storeDocument = async (document) => {
  try {
    console.log('Storing document in mongoService:', document);
    
    // Validate required fields
    if (!document.owner || !document.name || !document.type || !document.ipfsHash) {
      throw new Error('Missing required fields: owner, name, type, and ipfsHash are required');
    }

    const response = await axios.post(`${API_URL}/documents`, {
      ...document,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    if (!response.data) {
      throw new Error('No data received from server');
    }

    console.log('Document stored successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error storing document:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.error || error.response.data.details || 'Failed to store document');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'Failed to store document');
    }
  }
};
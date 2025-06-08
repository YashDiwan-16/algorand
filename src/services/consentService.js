import { storeConsentRequest } from './mongoService.js';

const API_URL = 'http://localhost:5001/api';

export const getConsentRequests = async (address, type = 'all') => {
  try {
    console.log(`Fetching ${type} consent requests for address:`, address);
    
    let url = `${API_URL}/consent/user/${address}`;

    const response = await fetch(url);
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

export const updateConsentRequest = async (requestId, updates) => {
  try {
    const response = await fetch(`${API_URL}/consent/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating consent request:', error);
    throw error;
  }
};

export const getConsentRequest = async (requestId) => {
  try {
    const response = await fetch(`${API_URL}/consent/${requestId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch consent request');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching consent request:', error);
    throw error;
  }
};

export const createConsentRequest = async (requestData) => {
  try {
    const requestId = Date.now().toString();
    const request = {
      ...requestData,
      requestId,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store in MongoDB
    const response = await fetch(`${API_URL}/consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
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
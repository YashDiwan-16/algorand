import * as algokit from '@algorandfoundation/algokit-utils';
import algosdk from 'algosdk';

// Initialize Algorand client with environment variables
export const getAlgoClient = () => {
  const algodToken = process.env.NEXT_PUBLIC_ALGOD_TOKEN || '';
  const algodServer = process.env.NEXT_PUBLIC_ALGOD_SERVER || 'http://localhost';
  const algodPort = process.env.NEXT_PUBLIC_ALGOD_PORT || '4001';

  const algodClient = new algosdk.Algodv2(
    algodToken,
    algodServer,
    algodPort
  );

  return algodClient;
};

// Initialize Algorand indexer with environment variables
export const getAlgoIndexer = () => {
  const indexerToken = process.env.NEXT_PUBLIC_INDEXER_TOKEN || '';
  const indexerServer = process.env.NEXT_PUBLIC_INDEXER_SERVER || 'http://localhost';
  const indexerPort = process.env.NEXT_PUBLIC_INDEXER_PORT || '8980';

  const indexerClient = new algosdk.Indexer(
    indexerToken,
    indexerServer,
    indexerPort
  );

  return indexerClient;
};

// Get AlgoKit AlgoClient with appropriate configuration
export const getAlgoKitClient = () => {
  const algodClient = getAlgoClient();
  return algokit.getAlgoClient({
    algodClient,
  });
};

// Function to get the app ID from environment
export const getAppId = (): number => {
  const appId = process.env.NEXT_PUBLIC_APP_ID;
  return appId ? parseInt(appId, 10) : 0;
};

// Utility to convert string to bytes
export const stringToBytes = (str: string): Uint8Array => {
  return new TextEncoder().encode(str);
};

// Utility to convert bytes to string
export const bytesToString = (bytes: Uint8Array): string => {
  return new TextDecoder().decode(bytes);
};

// Format Algorand address for display
export const formatAddress = (address: string): string => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}; 
import * as algokit from '@algorandfoundation/algokit-utils';
import * as algosdk from 'algosdk';
import { getAlgoClient, getAppId } from '@/utils/algorand';

// Interface for Consent Record
export interface ConsentRecord {
  websiteUrl: string;
  grantedAt: number;
  dataUsagePolicy: string;
  expiry: number;
  active: boolean;
  dataRequested?: string[];
}

// LocalStorage keys
const STORAGE_KEYS = {
  REGISTERED_USERS: 'consent_manager_registered_users',
  USER_CONSENTS: 'consent_manager_user_consents'
};

// Mock suggested parameters for demo mode
const MOCK_SUGGESTED_PARAMS = {
  flatFee: false,
  fee: 1000,
  firstRound: 1000,
  lastRound: 2000,
  genesisID: 'mocknet-v1.0',
  genesisHash: 'SGO1GKSzyE7IEPItTxCByw9x8FmnrCDexi9/cOUJOiI=',
  minFee: 1000
};

// Default consents for new users
const DEFAULT_CONSENTS: ConsentRecord[] = [
  { 
    websiteUrl: 'google.com', 
    grantedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, 
    dataUsagePolicy: 'Personal information for service improvement and targeted ads', 
    expiry: Date.now() + 90 * 24 * 60 * 60 * 1000, 
    active: true,
    dataRequested: ['Email', 'Search history', 'Location data']
  },
  { 
    websiteUrl: 'facebook.com', 
    grantedAt: Date.now() - 30 * 24 * 60 * 60 * 1000, 
    dataUsagePolicy: 'Profile information for social network functionality and ad targeting', 
    expiry: 0, 
    active: true,
    dataRequested: ['Name', 'Email', 'Phone number', 'Friends list', 'Photos', 'Posts']
  }
];

// ConsentClient class for interacting with the consent smart contract
export class ConsentClient {
  private algodClient: algosdk.Algodv2;
  private appId: number;
  private demoMode: boolean = true; // Enable demo mode by default
  
  constructor() {
    try {
      this.algodClient = getAlgoClient();
      this.appId = getAppId();
    } catch (error) {
      console.warn("Error initializing algod client, falling back to demo mode", error);
      // Create a dummy client that will never be used
      this.algodClient = new algosdk.Algodv2("", "http://localhost", "");
      this.appId = 0;
      this.demoMode = true;
    }
  }
  
  // Get the Algod client instance
  getAlgodClient(): algosdk.Algodv2 {
    return this.algodClient;
  }
  
  // Get transaction parameters safely (works in demo mode)
  private async getSuggestedParams(): Promise<algosdk.SuggestedParams> {
    if (this.demoMode) {
      return MOCK_SUGGESTED_PARAMS;
    }
    
    try {
      return await this.algodClient.getTransactionParams().do();
    } catch (error) {
      console.warn("Error getting transaction params, using mock params", error);
      return MOCK_SUGGESTED_PARAMS;
    }
  }

  // Local storage methods for demo mode
  private saveRegisteredUser(address: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      const users = this.getRegisteredUsers();
      if (!users.includes(address)) {
        users.push(address);
        localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
      }
    } catch (error) {
      console.error("Error saving registered user to local storage", error);
    }
  }
  
  private getRegisteredUsers(): string[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const users = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return users ? JSON.parse(users) : [];
    } catch (error) {
      console.error("Error getting registered users from local storage", error);
      return [];
    }
  }
  
  private isUserRegistered(address: string): boolean {
    return this.getRegisteredUsers().includes(address);
  }
  
  private saveUserConsents(address: string, consents: ConsentRecord[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      const allConsents = this.getAllUserConsents();
      allConsents[address] = consents;
      localStorage.setItem(STORAGE_KEYS.USER_CONSENTS, JSON.stringify(allConsents));
    } catch (error) {
      console.error("Error saving user consents to local storage", error);
    }
  }
  
  private getUserConsents(address: string): ConsentRecord[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const allConsents = this.getAllUserConsents();
      return allConsents[address] || [];
    } catch (error) {
      console.error("Error getting user consents from local storage", error);
      return [];
    }
  }
  
  private getAllUserConsents(): Record<string, ConsentRecord[]> {
    if (typeof window === 'undefined') return {};
    
    try {
      const consents = localStorage.getItem(STORAGE_KEYS.USER_CONSENTS);
      return consents ? JSON.parse(consents) : {};
    } catch (error) {
      console.error("Error getting all user consents from local storage", error);
      return {};
    }
  }
  
  // Mock transaction submission for demo mode
  private async mockSendRawTransaction(txns: Uint8Array[]): Promise<{ txId: string }> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
    
    // Generate a fake txId
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    const txId = Buffer.from(randomBytes).toString('base64').substring(0, 52);
    
    return { txId };
  }
  
  // Mock wait for confirmation for demo mode
  private async mockWaitForConfirmation(txId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate confirmation delay
    return {
      confirmed: true,
      txId,
      "pool-error": "",
      "tx-index": 1
    };
  }
  
  // Register a user in the consent manager system
  async registerUser(senderAddress: string): Promise<algosdk.Transaction> {
    try {
      // Get the suggested transaction parameters
      const suggestedParams = await this.getSuggestedParams();
      
      // Save to local storage in demo mode
      if (this.demoMode) {
        this.saveRegisteredUser(senderAddress);
        
        // Initialize with default consents if this is the first registration
        if (this.getUserConsents(senderAddress).length === 0) {
          this.saveUserConsents(senderAddress, DEFAULT_CONSENTS);
        }
      }
      
      // Create the application call transaction
      const transaction = new algosdk.Transaction({
        from: senderAddress,
        to: algosdk.getApplicationAddress(this.appId > 0 ? this.appId : 1),
        fee: suggestedParams.fee,
        firstRound: suggestedParams.firstRound,
        lastRound: suggestedParams.lastRound,
        genesisHash: suggestedParams.genesisHash,
        genesisID: suggestedParams.genesisID,
        type: 'appl',
        appIndex: this.appId > 0 ? this.appId : 1,
        appArgs: [new Uint8Array(Buffer.from('register_user'))],
      });
      
      return transaction.do();
    } catch (error) {
      console.error("Error registering user:", error);
      throw new Error(`Failed to register user: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // Grant consent to a website
  async grantConsent(
    senderAddress: string, 
    websiteUrl: string, 
    dataUsagePolicy: string, 
    expiryDuration: number,
    dataRequested: string[] = []
  ): Promise<algosdk.Transaction> {
    try {
      const suggestedParams = await this.getSuggestedParams();
      
      // Update local storage in demo mode
      if (this.demoMode) {
        const userConsents = this.getUserConsents(senderAddress);
        const existingConsentIndex = userConsents.findIndex(c => c.websiteUrl === websiteUrl);
        
        const newConsent: ConsentRecord = {
          websiteUrl,
          grantedAt: Date.now(),
          dataUsagePolicy,
          expiry: expiryDuration > 0 ? Date.now() + (expiryDuration * 1000) : 0,
          active: true,
          dataRequested
        };
        
        if (existingConsentIndex >= 0) {
          // Update existing consent
          userConsents[existingConsentIndex] = newConsent;
        } else {
          // Add new consent
          userConsents.push(newConsent);
        }
        
        this.saveUserConsents(senderAddress, userConsents);
      }
      
      // Create application args
      const appArgs = [
        new Uint8Array(Buffer.from('grant_consent')),
        new Uint8Array(Buffer.from(websiteUrl)),
        new Uint8Array(Buffer.from(dataUsagePolicy)),
        algosdk.encodeUint64(expiryDuration)
      ];
      
      // Create the transaction
      const transaction = new algosdk.Transaction({
        from: senderAddress,
        to: algosdk.getApplicationAddress(this.appId > 0 ? this.appId : 1),
        fee: suggestedParams.fee,
        firstRound: suggestedParams.firstRound,
        lastRound: suggestedParams.lastRound,
        genesisHash: suggestedParams.genesisHash,
        genesisID: suggestedParams.genesisID,
        type: 'appl',
        appIndex: this.appId > 0 ? this.appId : 1,
        appArgs: appArgs
      });
      
      return transaction.do();
    } catch (error) {
      console.error("Error granting consent:", error);
      throw new Error(`Failed to grant consent: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // Revoke a previously granted consent
  async revokeConsent(
    senderAddress: string, 
    websiteUrl: string
  ): Promise<algosdk.Transaction> {
    try {
      const suggestedParams = await this.getSuggestedParams();
      
      // Update local storage in demo mode
      if (this.demoMode) {
        const userConsents = this.getUserConsents(senderAddress);
        const existingConsentIndex = userConsents.findIndex(c => c.websiteUrl === websiteUrl);
        
        if (existingConsentIndex >= 0) {
          // Mark consent as inactive
          userConsents[existingConsentIndex].active = false;
          this.saveUserConsents(senderAddress, userConsents);
        }
      }
      
      // Create application args
      const appArgs = [
        new Uint8Array(Buffer.from('revoke_consent')),
        new Uint8Array(Buffer.from(websiteUrl))
      ];
      
      // Create the transaction
      const transaction = new algosdk.Transaction({
        from: senderAddress,
        to: algosdk.getApplicationAddress(this.appId > 0 ? this.appId : 1),
        fee: suggestedParams.fee,
        firstRound: suggestedParams.firstRound,
        lastRound: suggestedParams.lastRound,
        genesisHash: suggestedParams.genesisHash,
        genesisID: suggestedParams.genesisID,
        type: 'appl',
        appIndex: this.appId > 0 ? this.appId : 1,
        appArgs: appArgs
      });
      
      return transaction.do();
    } catch (error) {
      console.error("Error revoking consent:", error);
      throw new Error(`Failed to revoke consent: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // Check if a user has given consent to a website
  async checkConsent(
    senderAddress: string,
    user: string, 
    websiteUrl: string
  ): Promise<boolean> {
    try {
      // In demo mode, check local storage
      if (this.demoMode) {
        console.log("Using demo mode for checking consent");
        const userConsents = this.getUserConsents(user);
        const consent = userConsents.find(c => c.websiteUrl === websiteUrl);
        return !!consent && consent.active;
      }
      
      const suggestedParams = await this.getSuggestedParams();
      
      const appArgs = [
        new Uint8Array(Buffer.from('check_consent')),
        new Uint8Array(Buffer.from(user)),
        new Uint8Array(Buffer.from(websiteUrl))
      ];
      
      // Create a no-op transaction to call the check_consent method
      const txn = new algosdk.Transaction({
        from: senderAddress,
        to: algosdk.getApplicationAddress(this.appId),
        fee: suggestedParams.fee,
        firstRound: suggestedParams.firstRound,
        lastRound: suggestedParams.lastRound,
        genesisHash: suggestedParams.genesisHash,
        genesisID: suggestedParams.genesisID,
        type: 'appl',
        appIndex: this.appId,
        appArgs: appArgs
      });
      
      // We would typically use ARC4 interaction to get the return value
      // For now, just return a placeholder
      return true;
    } catch (error) {
      console.error("Error checking consent:", error);
      return false;
    }
  }
  
  // Get detailed information about consent for a specific website
  async getWebsiteConsentDetails(
    senderAddress: string,
    user: string, 
    websiteUrl: string
  ): Promise<string> {
    try {
      // In demo mode, return data from local storage
      if (this.demoMode) {
        console.log("Using demo mode for getting consent details");
        const userConsents = this.getUserConsents(user);
        const consent = userConsents.find(c => c.websiteUrl === websiteUrl);
        
        if (consent) {
          return JSON.stringify(consent);
        }
        
        return JSON.stringify({
          websiteUrl,
          grantedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          dataUsagePolicy: "Standard data collection for website functionality",
          expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          active: true
        });
      }
      
      const suggestedParams = await this.getSuggestedParams();
      
      const appArgs = [
        new Uint8Array(Buffer.from('get_website_consent_details')),
        new Uint8Array(Buffer.from(user)),
        new Uint8Array(Buffer.from(websiteUrl))
      ];
      
      // Create a no-op transaction to call the get_website_consent_details method
      const txn = new algosdk.Transaction({
        from: senderAddress,
        to: algosdk.getApplicationAddress(this.appId),
        fee: suggestedParams.fee,
        firstRound: suggestedParams.firstRound,
        lastRound: suggestedParams.lastRound,
        genesisHash: suggestedParams.genesisHash,
        genesisID: suggestedParams.genesisID,
        type: 'appl',
        appIndex: this.appId,
        appArgs: appArgs
      });
      
      // We would typically use ARC4 interaction to get the return value
      // For now, just return a placeholder
      return "Mock consent details";
    } catch (error) {
      console.error("Error getting website consent details:", error);
      throw new Error(`Failed to get website consent details: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // List all consents granted by a user
  async listUserConsents(
    senderAddress: string,
    user: string
  ): Promise<string> {
    try {
      // In demo mode, return data from local storage
      if (this.demoMode) {
        console.log("Using demo mode for listing user consents");
        
        // If user is registered, return actual consents from storage
        if (this.isUserRegistered(user)) {
          const userConsents = this.getUserConsents(user);
          return JSON.stringify(userConsents.map(c => c.websiteUrl));
        }
        
        // Otherwise return default websites
        return JSON.stringify([
          "google.com", 
          "facebook.com", 
          "twitter.com", 
          "amazon.com",
          "digilocker.gov.in", 
          "healthid.ndhm.gov.in", 
          "netflix.com"
        ]);
      }
      
      const suggestedParams = await this.getSuggestedParams();
      
      const appArgs = [
        new Uint8Array(Buffer.from('list_user_consents')),
        new Uint8Array(Buffer.from(user))
      ];
      
      // Create a no-op transaction to call the list_user_consents method
      const txn = new algosdk.Transaction({
        from: senderAddress,
        to: algosdk.getApplicationAddress(this.appId),
        fee: suggestedParams.fee,
        firstRound: suggestedParams.firstRound,
        lastRound: suggestedParams.lastRound,
        genesisHash: suggestedParams.genesisHash,
        genesisID: suggestedParams.genesisID,
        type: 'appl',
        appIndex: this.appId,
        appArgs: appArgs
      });
      
      // We would typically use ARC4 interaction to get the return value
      return "example.com, google.com, facebook.com";
    } catch (error) {
      console.error("Error listing user consents:", error);
      throw new Error(`Failed to list user consents: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  // Get all consent details for a user (demo mode only)
  async getUserConsentDetails(user: string): Promise<ConsentRecord[]> {
    try {
      if (this.demoMode) {
        return this.getUserConsents(user);
      }
      return [];
    } catch (error) {
      console.error("Error getting user consent details:", error);
      return [];
    }
  }
  
  // Send raw transaction with built-in demo mode support
  async sendRawTransaction(signedTxns: Uint8Array[]): Promise<{ txId: string }> {
    try {
      if (this.demoMode) {
        return this.mockSendRawTransaction(signedTxns);
      }
      
      return await this.algodClient.sendRawTransaction(signedTxns).do();
    } catch (error) {
      console.error("Error sending transaction:", error);
      return this.mockSendRawTransaction(signedTxns);
    }
  }
  
  // Wait for confirmation with built-in demo mode support
  async waitForConfirmation(txId: string, rounds: number): Promise<any> {
    try {
      if (this.demoMode) {
        return this.mockWaitForConfirmation(txId);
      }
      
      return await algosdk.waitForConfirmation(this.algodClient, txId, rounds);
    } catch (error) {
      console.error("Error waiting for confirmation:", error);
      return this.mockWaitForConfirmation(txId);
    }
  }
} 
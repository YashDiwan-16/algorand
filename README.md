# Consent Management System on Algorand with Next.js

A modern, blockchain-powered consent management system built on Algorand using Next.js and AlgoKit. This application allows users to control which websites and institutions can access their personal data through a beautiful and intuitive UI.

## Overview of the Solution
- Users can **grant consent** by issuing an **NFT-based access token**.
- Institutions can use this NFT to **verify and access** documents via DigiLocker.
- Users can **revoke consent** by **burning, freezing, or expiring** the NFT.
- The system ensures **privacy** using **Zero-Knowledge Proofs (ZKP)** and **Algorand Blockchain**.
- The UI is **user-friendly** for managing consent requests.

## Features

- **User Registration**: Register as a user in the consent management system
- **Grant Consent**: Allow websites to access specific data with customized policies
- **View Consents**: See a list of all websites you've granted consent to
- **Revoke Consent**: Remove consent from websites at any time
- **Blockchain Security**: All actions are recorded securely on the Algorand blockchain
- **Modern UI**: Built with Next.js and TailwindCSS for a responsive, beautiful experience
- **DigiLocker & Aadhaar Integration**: Connect with India's digital identity systems

## Tech Stack

### Blockchain & Smart Contracts
- **Algorand Blockchain** – Used for storing NFTs and ensuring tamper-proof consent
- **Smart Contracts** – Handle consent creation, revocation, and verification
- **AlgoKit** - Algorand development toolkit

### Identity & Data Management
- **Aadhaar e-KYC & DigiLocker API** – For fetching and verifying identity/documents
- **Self-Sovereign Identity (SSI) Framework** – User owns their data

### Privacy & Security
- **Zero-Knowledge Proofs (ZKP)** – Ensures only authorized institutions can access data
- **IPFS/Arweave** – Stores metadata off-chain (document hashes, NFT details)

### Frontend & User Interface
- **Next.js + Tailwind CSS** – For a modern, user-friendly UI
- **Algorand Wallet Integration**: @txnlab/use-wallet, Pera Wallet, Defly Wallet

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (16.x or higher)
- [AlgoKit](https://developer.algorand.org/docs/get-details/algokit/)
- [Docker](https://www.docker.com/products/docker-desktop/) for running LocalNet

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/next-consent-manager.git
cd next-consent-manager
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file based on the example:

```
NEXT_PUBLIC_APP_ID=0
NEXT_PUBLIC_ALGOD_SERVER=http://localhost
NEXT_PUBLIC_ALGOD_PORT=4001
NEXT_PUBLIC_ALGOD_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
NEXT_PUBLIC_INDEXER_SERVER=http://localhost
NEXT_PUBLIC_INDEXER_PORT=8980
NEXT_PUBLIC_INDEXER_TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

4. Start the Algorand LocalNet (in a separate terminal):

```bash
algokit localnet start
```

5. Run the development server:

```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## System Architecture

### 1. Consent Issuance (NFT Creation)
- User logs in using **DigiLocker/Aadhaar e-KYC**.
- Selects **which document(s)** they want to share.
- A **Consent NFT** is minted on Algorand and sent to the institution.
- The NFT contains:
  - **Document Hash (from DigiLocker)**
  - **Expiry Time** (if applicable)
  - **Institution Address (who can access it)**

### 2. Consent Verification (Institutions Accessing Data)
- Institution **verifies NFT ownership** and **checks expiry**.
- Uses **ZKP to confirm document authenticity** without exposing the full data.
- If valid, the system **grants access to the document on DigiLocker**.

### 3. Consent Revocation (User Taking Back Access)
- **Burn the NFT (Permanent Revoke)**
- **Freeze the NFT (Temporary Suspend Access)**
- **ZKP-Based Revocation (Instantly Blocks Unauthorized Access)**

## Smart Contract Deployment

To deploy the smart contract to the Algorand network:

1. Navigate to the smart contract directory:

```bash
cd consent-manager/projects/consent-manager-contracts
```

2. Deploy the contract:

```bash
algokit project deploy localnet
```

3. Note the Application ID returned from deployment and update your `.env.local` file with that ID:

```
NEXT_PUBLIC_APP_ID=your_application_id
```

## Usage

### Connecting Your Wallet

1. Click "Connect Wallet" to connect your Algorand wallet
2. Select your preferred wallet provider (Pera, Defly, etc.)

### Registering as a User

1. After connecting your wallet, click "Register User"
2. Confirm the transaction in your wallet

### Managing Consents

Click "Manage Consents" to open the consent manager dashboard where you can:

1. View all your existing consents
2. Grant new consents to websites
3. Revoke existing consents

## Development and Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Process

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Algorand Foundation](https://algorand.foundation/)
- [AlgoKit](https://developer.algorand.org/docs/get-details/algokit/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DigiLocker](https://digilocker.gov.in/)
- [Aadhaar](https://uidai.gov.in/)

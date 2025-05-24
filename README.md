<<<<<<< HEAD
# Consent Management System

A Web3-enabled consent management system leveraging India's Aadhaar and DigiLocker infrastructure, integrated with Algorand blockchain for secure, user-controlled data sharing.

## System Architecture

### Core Modules

1. **User Dashboard**
   - Centralized interface for managing consent preferences
   - Real-time consent status and history tracking
   - Integration with Aadhaar/DigiLocker for identity verification

2. **Immutable Consent Records**
   - Algorand Layer-1 Smart Contracts
   - Event tracking and metadata storage
   - Complete audit trail functionality

3. **Smart Contract Automation**
   - Auto-revocation of expired consents
   - Stateful smart contracts for consent monitoring
   - Real-time notifications

4. **Cross-Platform Consent Interoperability**
   - Algorand Standard Assets (ASAs) for consent representation
   - Token lifecycle management
   - Cross-platform validation

5. **Compliance and Audit Tools**
   - Real-time monitoring dashboards
   - Automated reporting
   - Regulatory compliance enforcement

6. **Privacy and Security**
   - Zero-Knowledge Proofs implementation
   - Encrypted off-chain storage
   - Secure key management
=======
<<<<<<< HEAD
# Algorand Consent Manager

A decentralized consent management system built on the Algorand blockchain using AlgoKit. This project implements a secure and transparent way to manage user consents for data sharing and access control.

## Features

- Smart contract-based consent management
- Time-bound consent grants
- Consent revocation
- Metadata storage for consent details
- Modern React frontend with Material-UI
- Integration with Algorand wallets

## Prerequisites

- Python 3.12+
- Node.js 16+
- Docker
- AlgoKit (`pipx install algokit`)
>>>>>>> 0929bfb78a06bbf6f3d9e7937f42d02a3a9f54ca

## Project Structure

```
<<<<<<< HEAD
.
├── frontend/                 # React-based user dashboard
├── algorand/                # Algorand smart contracts and utilities
├── backend/                 # Node.js backend services
├── contracts/              # Smart contract implementations
├── utils/                  # Utility functions and helpers
└── docs/                   # Documentation and API references
```

## Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- Algorand SDK
- Aadhaar API credentials
- DigiLocker API credentials

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   pip install -r requirements.txt
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
4. Set up Algorand testnet account
5. Configure Aadhaar and DigiLocker API credentials
6. Start the development servers:
   ```bash
   npm run dev
   ```
=======
manager/
├── smart_contracts/
│   └── manage/
│       ├── contract.py
│       └── deploy_config.py
├── frontend/
│   ├── src/
│   │   └── App.tsx
│   └── package.json
└── README.md
```

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd manager
```

2. Set up the smart contract:
```bash
cd smart_contracts/manage
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:
```bash
cd frontend
npm install
```

## Development

1. Start LocalNet:
=======
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

>>>>>>> 3e033a2d5af3d0b2d4b2aba13fd7f5b97400ae07
```bash
algokit localnet start
```

<<<<<<< HEAD
2. Deploy the smart contract:
```bash
cd smart_contracts/manage
python deploy_config.py
```

3. Start the frontend development server:
```bash
cd frontend
npm start
```

## Smart Contract

The smart contract implements the following functionality:

- `grant_consent`: Grant consent to a recipient with specified scope and expiry
- `revoke_consent`: Revoke previously granted consent
- `update_consent`: Update consent parameters
- `verify_consent`: Verify if a consent is valid

## Frontend

The React frontend provides:

- Wallet connection
- Consent management interface
- Real-time consent status updates
- Transaction history

## Testing

1. Smart Contract Tests:
```bash
cd smart_contracts/manage
python -m pytest
```

2. Frontend Tests:
```bash
cd frontend
npm test
```

## Deployment

1. Deploy to TestNet:
```bash
algokit project deploy --network testnet
```

2. Deploy to MainNet:
```bash
algokit project deploy --network mainnet
```
>>>>>>> 0929bfb78a06bbf6f3d9e7937f42d02a3a9f54ca

## Security Considerations

- All sensitive data is encrypted before storage
<<<<<<< HEAD
- Private keys are managed securely
- Zero-knowledge proofs for consent verification
- Regular security audits and compliance checks

## License

MIT License

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests. 
=======
- Time-bound consents with automatic expiry
- Role-based access control
- Audit trail for all consent operations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
=======
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
>>>>>>> 3e033a2d5af3d0b2d4b2aba13fd7f5b97400ae07

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

<<<<<<< HEAD
- Algorand Foundation
- AlgoKit Team
- Material-UI Team
=======
- [Algorand Foundation](https://algorand.foundation/)
- [AlgoKit](https://developer.algorand.org/docs/get-details/algokit/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DigiLocker](https://digilocker.gov.in/)
- [Aadhaar](https://uidai.gov.in/)
>>>>>>> 3e033a2d5af3d0b2d4b2aba13fd7f5b97400ae07
>>>>>>> 0929bfb78a06bbf6f3d9e7937f42d02a3a9f54ca

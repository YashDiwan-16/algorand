# ConsentChain - Algorand-based Consent Management Platform

## Overview
ConsentChain is a decentralized consent management platform built on Algorand blockchain. It enables secure, transparent, and efficient management of data sharing consents between individuals and institutions.

## 🌟 Core Features

### 1. Smart Contract Integration
- **ConsentContract.py**: Core smart contract for managing consents
  - Request consent
  - Grant consent
  - Revoke consent
  - View document permissions
  - Expiry management
  - Role-based access control

### 2. Frontend Modules
- **Authentication & Wallet Integration**
  - Pera Wallet integration
  - QR code-based wallet connection
  - Session management
  - Role-based routing

- **Consent Management Interface**
  - Request consent form
  - Grant consent dashboard
  - Consent history view
  - Document viewer
  - Permission management

- **User Dashboard**
  - Active consents
  - Pending requests
  - Document library
  - Activity logs
  - Settings management

- **Reusable UI Components**
  - `Input` and `TextArea`: Standardized form input fields.
  - `Pill`: For displaying status labels.
  - `Toggle`: An animated on/off switch.
  - `Spinner`: A loading indicator for async operations.
  - `Modal`: A generic modal/dialog component.

### 3. Backend Services
- **Algorand Service** (`algorandConsentService.js`)
  - Smart contract interaction
  - Transaction management
  - Account management
  - State verification

- **IPFS Service** (`ipfsService.js`)
  - Document storage
  - Content addressing
  - Metadata management

- **MongoDB Service** (`mongoService.js`)
  - User data storage
  - Consent records
  - Activity logs
  - Analytics data

- **Telegram Bot Service** (`telegramBotService.js`)
  - Notification system
  - Consent alerts
  - Status updates

## 🛠️ Technical Architecture

### 1. Smart Contracts
```python
# ConsentContract.py
- approval_program(): Main contract logic
- clear_state_program(): State clearing logic
- Key operations:
  - request_consent()
  - grant_consent()
  - revoke_consent()
  - view_document()
```

### 2. Frontend Architecture
```
src/
├── components/
│   ├── ConsentRecord.tsx    # Consent display component
│   ├── DigiLocker.tsx       # Document management
│   ├── WalletConnect.js     # Wallet integration
│   └── animations/          # UI animations
├── pages/
│   ├── Dashboard.js         # Main dashboard
│   ├── GrantConsent.js      # Consent granting
│   ├── RequestConsent.js    # Consent requesting
│   └── ViewConsent.js       # Consent viewing
└── services/               # Backend services
```

## 📂 Project Structure

A brief overview of the key directories in the frontend application:

```
src/
├── api/             # Functions for interacting with the backend API
├── assets/          # Static assets like images and SVGs
├── components/      # Reusable React components (Buttons, Modals, etc.)
├── constants/       # Application-wide constants
├── contexts/        # React context providers for global state
├── hooks/           # Custom React hooks
├── layouts/         # Layout components (e.g., main app layout with Navbar)
├── pages/           # Top-level page components for each route
├── services/        # Services for interacting with external APIs (Algorand, IPFS)
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx          # Main application component with routing
└── index.tsx        # Application entry point
```

### 3. Backend Architecture
```
server/
├── index.js               # Main server
├── models/
│   └── consentRequest.js  # Data models
└── services/             # Business logic
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.17.0 or as specified in `.nvmrc`)
- Python 3.8+
- An Algorand Testnet Account with funds

### Backend & Contracts Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YashDiwan-16/algorand.git
    cd algorand
    ```

2.  **Install Python dependencies:**
    ```bash
    cd contracts
    pip install -r requirements.txt
    ```

3.  **Set up environment variables:**
    -   Navigate to the `contracts` directory.
    -   Copy `.env.example` to a new file named `.env`.
    -   Fill in your `CREATOR_MNEMONIC` and `RECIPIENT_MNEMONIC`.

4.  **Deploy the contracts:**
    ```bash
    python deploy.py
    ```

### Frontend Setup

1.  **Install frontend dependencies:**
    (From the root `algorand` directory)
    ```bash
    npm install
    ```

2.  **Start the development servers:**
    This command starts both the React frontend and the Express backend concurrently.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## 📱 Use Cases

### 1. Healthcare
- Secure sharing of medical records
- Patient consent management
- HIPAA compliance
- Research data sharing

### 2. Education
- Academic record verification
- Certificate sharing
- Student data management
- Institution collaboration

### 3. Employment
- Document verification
- Background check consent
- Employee data management
- HR process automation

### 4. Personal
- Identity document sharing
- Personal data management
- Privacy control
- Data portability

## 🔒 Security Features

1. **Blockchain Security**
   - Immutable consent records
   - Transparent audit trail
   - Cryptographic verification
   - Smart contract security

2. **Data Protection**
   - End-to-end encryption
   - IPFS content addressing
   - Secure key management
   - Access control

3. **Privacy Controls**
   - Granular permissions
   - Time-limited access
   - Revocation capabilities
   - Data minimization

## 🛠️ Development

### Testing
```bash
# Run frontend tests
npm test

# Run smart contract tests
python contracts/scripts/test.py

# Run integration tests
npm run test:integration
```

### Deployment
```bash
# Deploy to mainnet
python contracts/scripts/deploy.py --network mainnet

# Build frontend
npm run build

# Deploy frontend
npm run deploy
```

## 📊 API Documentation

### Smart Contract Methods
```python
# Request Consent
request_consent(document_hash, document_type, request_id, requester)

# Grant Consent
grant_consent(expiry, permissions)

# Revoke Consent
revoke_consent()

# View Document
view_document()
```

### REST API Endpoints
```javascript
// Consent Management
POST /api/consent/request
GET /api/consent/:id
PUT /api/consent/:id/grant
DELETE /api/consent/:id

// Document Management
POST /api/document/upload
GET /api/document/:id
DELETE /api/document/:id

// User Management
GET /api/user/profile
PUT /api/user/settings
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- Algorand Foundation
- Pera Wallet Team
- React Community
- TailwindCSS Team

## Telegram Bot Integration

ConsentChain now offers a seamless integration with Telegram! You can interact with the platform directly from your favorite messaging app using our official bot:

- **Bot Username:** [@consent_bot](https://t.me/consent_bot)
- **Features:**
  - Manage your data consents
  - Receive real-time notifications
  - Approve or reject requests
  - And more—all from Telegram!

To get started, visit the new **Telegram Bot** page in the app navigation or [click here](https://t.me/consent_bot).

## FAQ

### How do I use the ConsentChain Telegram bot?

Visit the new **Telegram Bot** page in the app or go to [@consent_bot](https://t.me/consent_bot) on Telegram. Follow the instructions to link your account and manage your data consents directly from Telegram.

# Algorand Smart Contracts

## Overview
This directory contains Algorand smart contracts and utility scripts for managing document consent on the Algorand blockchain.

### TEAL Contracts
- **consent_approval.teal**: Handles the main logic for requesting, granting, viewing, and revoking consent for document access between parties.
- **consent_clear.teal**: Minimal clear state program for contract deletion.

### Python Scripts
- **deploy.py**: Deploys the TEAL contracts to the Algorand blockchain and provides test functions for contract interaction.
- **generate_account.py**: Utility script to generate new Algorand accounts and print their address and mnemonic for use in testing or development.

## Usage Examples

### Deploy the Contract
```sh
python deploy.py
```

### Generate a New Account
```sh
python generate_account.py
```

### Fund a Testnet Account
```sh
python fund_account.py <ALGOD_ADDRESS>
```

### Test Contract Deployment
```sh
python test_deploy.py
```

## Code Formatting & Pre-commit Hooks

This project uses [black](https://github.com/psf/black) and [isort](https://github.com/pycqa/isort) for Python code formatting. To enable automatic formatting before each commit, install pre-commit and set up the hooks:

```sh
pip install pre-commit
pre-commit install
```

## TEAL Contract Logic Overview

### consent_approval.teal
This contract manages document consent between a creator and a recipient. The main actions are:
- **request_consent**: The creator requests access to a document from the recipient.
- **grant_consent**: The recipient grants access, specifying permissions and expiry.
- **view_document**: The creator views the document if consent is valid.
- **revoke_consent**: The recipient can revoke consent at any time.

The contract uses global state to track requests, permissions, and expiry. Only authorized parties can perform each action.

### consent_clear.teal
A minimal clear state program, used when deleting the application from an account. It always approves the clear operation.

---

For more details on contract logic and usage, see comments in the respective files. 
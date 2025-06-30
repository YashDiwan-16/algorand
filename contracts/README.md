# Algorand Smart Contracts

## Overview
This directory contains Algorand smart contracts and utility scripts for managing document consent on the Algorand blockchain.

### TEAL Contracts
- **consent_approval.teal**: Handles the main logic for requesting, granting, viewing, and revoking consent for document access between parties.
- **consent_clear.teal**: Minimal clear state program for contract deletion.

### Python Scripts
- **deploy.py**: Deploys the TEAL contracts to the Algorand blockchain and provides test functions for contract interaction.
- **generate_account.py**: Utility script to generate new Algorand accounts and print their address and mnemonic for use in testing or development.

## Code Formatting & Pre-commit Hooks

This project uses [black](https://github.com/psf/black) and [isort](https://github.com/pycqa/isort) for Python code formatting. To enable automatic formatting before each commit, install pre-commit and set up the hooks:

```sh
pip install pre-commit
pre-commit install
```

---

For more details on contract logic and usage, see comments in the respective files. 
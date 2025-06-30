import os
from dotenv import load_dotenv
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, ApplicationCallTxn, OnComplete, StateSchema
import base64
import json
import time
import pathlib

# Load environment variables from .env file
load_dotenv()

# Connect to Algorand testnet
algod_address = os.environ.get("ALGOD_ADDRESS", "https://testnet-api.algonode.cloud")
algod_token = os.environ.get("ALGOD_TOKEN", "")
client = algod.AlgodClient(algod_token, algod_address)

# Load the compiled TEAL program
def load_teal(filename):
    path = pathlib.Path(filename)
    with path.open('r') as f:
        return f.read()

# Create an account from the mnemonic
def get_account_from_mnemonic(mnemonic_str):
    private_key = mnemonic.to_private_key(mnemonic_str)
    address = account.address_from_private_key(private_key)
    return address, private_key

# Deploy the contract
def deploy_contract(creator_address, creator_private_key):
    # Read the approval and clear programs
    approval_program = load_teal("consent_approval.teal")
    clear_program = load_teal("consent_clear.teal")

    # Get suggested parameters
    params = client.suggested_params()

    # Create unsigned transaction
    txn = ApplicationCreateTxn(
        sender=creator_address,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=base64.b64decode(approval_program),
        clear_program=base64.b64decode(clear_program),
        global_schema=StateSchema(num_uints=8, num_byte_slices=8),
        local_schema=StateSchema(num_uints=0, num_byte_slices=0)
    )

    # Sign transaction
    signed_txn = txn.sign(creator_private_key)

    # Submit transaction
    tx_id = client.send_transaction(signed_txn)
    print(f"Deployed contract with transaction ID: {tx_id}")

    # Wait for confirmation
    transaction_response = client.pending_transaction_info(tx_id)
    app_id = transaction_response['application-index']
    print(f"Contract deployed with app ID: {app_id}")
    return app_id

# Test the contract
def test_contract(app_id, creator_address, creator_private_key, recipient_address, recipient_private_key):
    # Get suggested parameters
    params = client.suggested_params()

    # Test request_consent
    request_txn = ApplicationCallTxn(
        sender=creator_address,
        sp=params,
        index=app_id,
        on_complete=OnComplete.NoOpOC,
        app_args=[
            b"request_consent",
            b"document_hash_123",
            b"Aadhaar Card",
            b"request_1",
            recipient_address.encode()
        ]
    )
    signed_request = request_txn.sign(creator_private_key)
    request_tx_id = client.send_transaction(signed_request)
    print(f"Request consent transaction ID: {request_tx_id}")
    client.pending_transaction_info(request_tx_id)

    # Test grant_consent
    grant_txn = ApplicationCallTxn(
        sender=recipient_address,
        sp=params,
        index=app_id,
        on_complete=OnComplete.NoOpOC,
        app_args=[
            b"grant_consent",
            str(int(time.time()) + 30*24*60*60).encode(),  # 30 days expiry
            json.dumps({"view": True, "download": False}).encode()
        ]
    )
    signed_grant = grant_txn.sign(recipient_private_key)
    grant_tx_id = client.send_transaction(signed_grant)
    print(f"Grant consent transaction ID: {grant_tx_id}")
    client.pending_transaction_info(grant_tx_id)

    # Test view_document
    view_txn = ApplicationCallTxn(
        sender=creator_address,
        sp=params,
        index=app_id,
        on_complete=OnComplete.NoOpOC,
        app_args=[b"view_document"]
    )
    signed_view = view_txn.sign(creator_private_key)
    view_tx_id = client.send_transaction(signed_view)
    print(f"View document transaction ID: {view_tx_id}")
    client.pending_transaction_info(view_tx_id)

    # Test revoke_consent
    revoke_txn = ApplicationCallTxn(
        sender=recipient_address,
        sp=params,
        index=app_id,
        on_complete=OnComplete.NoOpOC,
        app_args=[b"revoke_consent"]
    )
    signed_revoke = revoke_txn.sign(recipient_private_key)
    revoke_tx_id = client.send_transaction(signed_revoke)
    print(f"Revoke consent transaction ID: {revoke_tx_id}")
    client.pending_transaction_info(revoke_tx_id)

def main():
    # Create accounts from mnemonics
    creator_mnemonic = os.environ.get("CREATOR_MNEMONIC", "")
    recipient_mnemonic = os.environ.get("RECIPIENT_MNEMONIC", "")

    creator_address, creator_private_key = get_account_from_mnemonic(creator_mnemonic)
    recipient_address, recipient_private_key = get_account_from_mnemonic(recipient_mnemonic)

    print(f"Creator address: {creator_address}")
    print(f"Recipient address: {recipient_address}")

    # Deploy contract
    app_id = deploy_contract(creator_address, creator_private_key)

    # Test contract functionality
    test_contract(app_id, creator_address, creator_private_key, recipient_address, recipient_private_key)

if __name__ == "__main__":
    main() 
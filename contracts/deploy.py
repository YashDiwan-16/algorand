import os
from dotenv import load_dotenv
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import ApplicationCreateTxn, ApplicationCallTxn, OnComplete, StateSchema
import base64
import json
import time
import pathlib
import logging

# Set up logging with a more detailed format
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables from .env file
load_dotenv()
logger.info("Loaded environment variables.")

# Connect to Algorand testnet
algod_address = os.environ.get("ALGOD_ADDRESS", "https://testnet-api.algonode.cloud")
algod_token = os.environ.get("ALGOD_TOKEN", "")
client = algod.AlgodClient(algod_token, algod_address)

def load_teal(filename):
    """Load a TEAL program from a file."""
    logger.info(f"Loading TEAL from {filename}...")
    path = pathlib.Path(filename)
    with path.open('r') as f:
        return f.read()

def get_account_from_mnemonic(mnemonic_str):
    """Get account address and private key from a mnemonic string."""
    private_key = mnemonic.to_private_key(mnemonic_str)
    address = account.address_from_private_key(private_key)
    return address, private_key

def deploy_contract(creator_address, creator_private_key):
    """Deploy the smart contract to the Algorand network."""
    logger.info("Starting contract deployment...")

    # Read the approval and clear programs
    approval_program_source = load_teal("consent_approval.teal")
    clear_program_source = load_teal("consent_clear.teal")

    approval_program_compiled = base64.b64decode(approval_program_source)
    clear_program_compiled = base64.b64decode(clear_program_source)
    logger.info("TEAL programs loaded and decoded.")

    # Get suggested parameters
    logger.info("Getting suggested transaction parameters...")
    params = client.suggested_params()
    logger.info("Transaction parameters obtained.")

    # Create unsigned transaction
    logger.info("Creating ApplicationCreateTxn...")
    txn = ApplicationCreateTxn(
        sender=creator_address,
        sp=params,
        on_complete=OnComplete.NoOpOC,
        approval_program=approval_program_compiled,
        clear_program=clear_program_compiled,
        global_schema=StateSchema(num_uints=8, num_byte_slices=8),
        local_schema=StateSchema(num_uints=0, num_byte_slices=0)
    )

    # Sign transaction
    logger.info("Signing transaction...")
    signed_txn = txn.sign(creator_private_key)
    logger.info("Transaction signed.")

    # Submit transaction
    logger.info("Submitting transaction to the network...")
    tx_id = client.send_transaction(signed_txn)
    logger.info(f"Submitted transaction with ID: {tx_id}")

    # Wait for confirmation
    logger.info("Waiting for transaction confirmation...")
    try:
        transaction_response = client.pending_transaction_info(tx_id)
        app_id = transaction_response['application-index']
        logger.info(f"Transaction confirmed. Contract deployed with App ID: {app_id}")
        return app_id
    except Exception as e:
        logger.error(f"Failed to confirm transaction: {e}")
        raise

def wait_for_confirmation(transaction_id):
    """Wait for a transaction to be confirmed."""
    logger.info(f"Waiting for confirmation of tx {transaction_id}...")
    last_round = client.status().get('last-round')
    while True:
        txinfo = client.pending_transaction_info(transaction_id)
        if txinfo.get('confirmed-round'):
            logger.info(f"Transaction {transaction_id} confirmed in round {txinfo.get('confirmed-round')}.")
            return txinfo
        last_round += 1
        client.status_after_block(last_round)

def test_contract(app_id, creator_address, creator_private_key, recipient_address, recipient_private_key):
    """Run a series of tests against the deployed smart contract."""
    logger.info(f"--- Starting tests for App ID: {app_id} ---")
    # Get suggested parameters
    params = client.suggested_params()

    # Test request_consent
    logger.info("Testing 'request_consent'...")
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
    wait_for_confirmation(request_tx_id)
    logger.info(f"'request_consent' test completed. Tx ID: {request_tx_id}")

    # Test grant_consent
    logger.info("Testing 'grant_consent'...")
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
    wait_for_confirmation(grant_tx_id)
    logger.info(f"'grant_consent' test completed. Tx ID: {grant_tx_id}")

    # Test view_document
    logger.info("Testing 'view_document'...")
    view_txn = ApplicationCallTxn(
        sender=creator_address,
        sp=params,
        index=app_id,
        on_complete=OnComplete.NoOpOC,
        app_args=[b"view_document"]
    )
    signed_view = view_txn.sign(creator_private_key)
    view_tx_id = client.send_transaction(signed_view)
    wait_for_confirmation(view_tx_id)
    logger.info(f"'view_document' test completed. Tx ID: {view_tx_id}")

    # Test revoke_consent
    logger.info("Testing 'revoke_consent'...")
    revoke_txn = ApplicationCallTxn(
        sender=recipient_address,
        sp=params,
        index=app_id,
        on_complete=OnComplete.NoOpOC,
        app_args=[b"revoke_consent"]
    )
    signed_revoke = revoke_txn.sign(recipient_private_key)
    revoke_tx_id = client.send_transaction(signed_revoke)
    wait_for_confirmation(revoke_tx_id)
    logger.info(f"'revoke_consent' test completed. Tx ID: {revoke_tx_id}")
    logger.info("--- All tests completed successfully! ---")

def main():
    """Main function to deploy and test the contract."""
    logger.info("--- Starting Deployment and Test Script ---")
    try:
        # Create accounts from mnemonics
        creator_mnemonic = os.environ.get("CREATOR_MNEMONIC")
        recipient_mnemonic = os.environ.get("RECIPIENT_MNEMONIC")

        if not creator_mnemonic or not recipient_mnemonic:
            logger.error("Mnemonics for creator or recipient not found in environment variables.")
            return

        logger.info("Retrieving accounts from mnemonics...")
        creator_address, creator_private_key = get_account_from_mnemonic(creator_mnemonic)
        recipient_address, recipient_private_key = get_account_from_mnemonic(recipient_mnemonic)

        logger.info(f"Creator address: {creator_address}")
        logger.info(f"Recipient address: {recipient_address}")

        # Deploy contract
        app_id = deploy_contract(creator_address, creator_private_key)

        # Test contract functionality
        if app_id:
            test_contract(app_id, creator_address, creator_private_key, recipient_address, recipient_private_key)
    except Exception as e:
        logger.critical(f"An unexpected error occurred: {e}", exc_info=True)
    finally:
        logger.info("--- Script execution finished ---")

if __name__ == "__main__":
    main() 
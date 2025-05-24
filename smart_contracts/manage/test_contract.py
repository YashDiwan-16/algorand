import pytest
from algokit_utils import (
    get_algod_client,
    get_indexer_client,
    get_localnet_default_account,
    deploy_app,
    get_app_account,
    get_app_global_state,
    get_app_local_state,
    get_app_boxes,
    get_app_box_names,
    get_app_box_value,
    get_app_box_names,
    get_app_box_value,
    get_app_boxes,
    get_app_global_state,
    get_app_local_state,
    get_app_account,
    get_localnet_default_account,
    get_algod_client,
    get_indexer_client,
    deploy_app,
    ApplicationSpecification,
)
from contract import ConsentManager

@pytest.fixture
def algod_client():
    return get_algod_client()

@pytest.fixture
def account():
    return get_localnet_default_account()

@pytest.fixture
def app_spec():
    return ApplicationSpecification(
        name="ConsentManager",
        description="A decentralized consent management system",
        creator=get_localnet_default_account(),
        approval_program="approval.teal",
        clear_program="clear.teal",
        global_schema=get_algod_client().suggested_params(),
        local_schema=get_algod_client().suggested_params(),
    )

def test_application_creation(algod_client, account, app_spec):
    # Deploy the application
    app_id = deploy_app(algod_client, app_spec)
    
    # Get the application account
    app_account = get_app_account(app_id)
    
    # Get the global state
    global_state = get_app_global_state(app_id)
    
    # Verify the owner is set correctly
    assert global_state[ConsentManager.Variables.owner] == account.address
    assert global_state[ConsentManager.Variables.status] == "active"

def test_grant_consent(algod_client, account, app_spec):
    # Deploy the application
    app_id = deploy_app(algod_client, app_spec)
    
    # Create a test recipient
    recipient = get_localnet_default_account()
    
    # Grant consent
    txn = algod_client.make_application_call_txn(
        sender=account.address,
        app_id=app_id,
        on_complete=0,
        app_args=[
            ConsentManager.AppMethods.grant_consent,
            recipient.address,
            "medical",
            "metadata"
        ],
        suggested_params=algod_client.suggested_params()
    )
    
    # Sign and send the transaction
    signed_txn = txn.sign(account.private_key)
    tx_id = algod_client.send_transaction(signed_txn)
    
    # Wait for confirmation
    algod_client.wait_for_confirmation(tx_id)
    
    # Get the global state
    global_state = get_app_global_state(app_id)
    
    # Verify the consent was granted
    assert global_state[ConsentManager.Variables.recipient] == recipient.address
    assert global_state[ConsentManager.Variables.scope] == "medical"
    assert global_state[ConsentManager.Variables.metadata] == "metadata"
    assert global_state[ConsentManager.Variables.status] == "granted"

def test_revoke_consent(algod_client, account, app_spec):
    # Deploy the application
    app_id = deploy_app(algod_client, app_spec)
    
    # Create a test recipient
    recipient = get_localnet_default_account()
    
    # Grant consent first
    grant_txn = algod_client.make_application_call_txn(
        sender=account.address,
        app_id=app_id,
        on_complete=0,
        app_args=[
            ConsentManager.AppMethods.grant_consent,
            recipient.address,
            "medical",
            "metadata"
        ],
        suggested_params=algod_client.suggested_params()
    )
    
    # Sign and send the grant transaction
    signed_grant_txn = grant_txn.sign(account.private_key)
    grant_tx_id = algod_client.send_transaction(signed_grant_txn)
    algod_client.wait_for_confirmation(grant_tx_id)
    
    # Revoke consent
    revoke_txn = algod_client.make_application_call_txn(
        sender=account.address,
        app_id=app_id,
        on_complete=0,
        app_args=[ConsentManager.AppMethods.revoke_consent],
        suggested_params=algod_client.suggested_params()
    )
    
    # Sign and send the revoke transaction
    signed_revoke_txn = revoke_txn.sign(account.private_key)
    revoke_tx_id = algod_client.send_transaction(signed_revoke_txn)
    algod_client.wait_for_confirmation(revoke_tx_id)
    
    # Get the global state
    global_state = get_app_global_state(app_id)
    
    # Verify the consent was revoked
    assert global_state[ConsentManager.Variables.status] == "revoked"

def test_verify_consent(algod_client, account, app_spec):
    # Deploy the application
    app_id = deploy_app(algod_client, app_spec)
    
    # Create a test recipient
    recipient = get_localnet_default_account()
    
    # Grant consent
    grant_txn = algod_client.make_application_call_txn(
        sender=account.address,
        app_id=app_id,
        on_complete=0,
        app_args=[
            ConsentManager.AppMethods.grant_consent,
            recipient.address,
            "medical",
            "metadata"
        ],
        suggested_params=algod_client.suggested_params()
    )
    
    # Sign and send the grant transaction
    signed_grant_txn = grant_txn.sign(account.private_key)
    grant_tx_id = algod_client.send_transaction(signed_grant_txn)
    algod_client.wait_for_confirmation(grant_tx_id)
    
    # Verify consent
    verify_txn = algod_client.make_application_call_txn(
        sender=recipient.address,
        app_id=app_id,
        on_complete=0,
        app_args=[ConsentManager.AppMethods.verify_consent],
        suggested_params=algod_client.suggested_params()
    )
    
    # Sign and send the verify transaction
    signed_verify_txn = verify_txn.sign(recipient.private_key)
    verify_tx_id = algod_client.send_transaction(signed_verify_txn)
    
    # The transaction should succeed
    algod_client.wait_for_confirmation(verify_tx_id) 
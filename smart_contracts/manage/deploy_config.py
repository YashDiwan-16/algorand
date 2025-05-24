from algokit_utils import (
    ApplicationSpecification,
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

def deploy():
    # Get the algod client
    algod_client = get_algod_client()
    
    # Get the default account
    account = get_localnet_default_account()
    
    # Create the application specification
    app_spec = ApplicationSpecification(
        name="ConsentManager",
        description="A decentralized consent management system",
        creator=account,
        approval_program="approval.teal",
        clear_program="clear.teal",
        global_schema=algod_client.suggested_params(),
        local_schema=algod_client.suggested_params(),
    )
    
    # Deploy the application
    app_id = deploy_app(algod_client, app_spec)
    
    print(f"Deployed ConsentManager with app ID: {app_id}")
    return app_id

if __name__ == "__main__":
    deploy() 
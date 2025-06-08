#!/usr/bin/env python3

import os
import sys
import json
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

def main():
    # Run the tests
    pytest.main(["-v", "test_contract.py"])

if __name__ == "__main__":
    main() 
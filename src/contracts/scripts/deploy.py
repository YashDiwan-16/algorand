#!/usr/bin/env python3

import json
from algosdk import account, mnemonic
from algosdk.v2client import algod
from algosdk.transaction import StateSchema, ApplicationCreateTxn
import base64
import os

MNEMONIC = "clean lend scan box absorb cancel legal wood frost dynamic frequent uphold cluster lake sibling luggage flat unfair runway pole physical receive foam above hat"
ALGOD_ADDRESS = "https://testnet-api.algonode.cloud"
ALGOD_TOKEN = ""  # No token needed for Algonode

# Read TEAL source
with open("approval.teal") as f:
    approval_program = f.read()
with open("clear.teal") as f:
    clear_program = f.read()

# Compile TEAL to bytecode
algod_client = algod.AlgodClient(ALGOD_TOKEN, ALGOD_ADDRESS)
compiled_approval = algod_client.compile(approval_program)["result"]
compiled_clear = algod_client.compile(clear_program)["result"]

# Get deployer account
private_key = mnemonic.to_private_key(MNEMONIC)
address = account.address_from_private_key(private_key)

# Define schema (adjust as needed)
global_schema = StateSchema(num_uints=2, num_byte_slices=6)
local_schema = StateSchema(num_uints=0, num_byte_slices=0)

# Get suggested params
params = algod_client.suggested_params()

# Create app create transaction
txn = ApplicationCreateTxn(
    sender=address,
    sp=params,
    on_complete=0,  # NoOp
    approval_program=base64.b64decode(compiled_approval),
    clear_program=base64.b64decode(compiled_clear),
    global_schema=global_schema,
    local_schema=local_schema,
)

# Sign and send
signed_txn = txn.sign(private_key)
txid = algod_client.send_transaction(signed_txn)
print(f"Transaction ID: {txid}")

# Wait for confirmation
def wait_for_confirmation(client, txid):
    last_round = client.status().get('last-round')
    while True:
        txinfo = client.pending_transaction_info(txid)
        if txinfo.get('confirmed-round', 0) > 0:
            return txinfo
        last_round += 1
        client.status_after_block(last_round)

confirmed_txn = wait_for_confirmation(algod_client, txid)
app_id = confirmed_txn["application-index"]
print(f"Deployed ConsentManager with App ID: {app_id}")

with open("app_id.json", "w") as f:
    json.dump({"app_id": app_id}, f) 
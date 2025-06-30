from algosdk import account, mnemonic

private_key, address = account.generate_account()
print(f"Address: {address}")
print(f"Mnemonic: {mnemonic.from_private_key(private_key)}") 
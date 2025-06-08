from algosdk import account, mnemonic

def create_account():
    private_key = account.generate_account()[0]
    address = account.address_from_private_key(private_key)
    mnemonic_str = mnemonic.from_private_key(private_key)
    
    print(f"Address: {address}")
    print(f"Mnemonic: {mnemonic_str}")
    return address, mnemonic_str

if __name__ == "__main__":
    create_account() 
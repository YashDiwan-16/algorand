import sys

if len(sys.argv) != 2:
    print("Usage: python fund_account.py <ALGOD_ADDRESS>")
    sys.exit(1)

address = sys.argv[1]

print(f"To fund your testnet account ({address}), visit:")
print("https://bank.testnet.algorand.network/")
print("Paste your address and request Algos. It may take a few minutes for funds to arrive.") 
#!/usr/bin/env python3

import os
import sys
import json
import subprocess

def main():
    # Change to the project directory
    os.chdir(os.path.dirname(os.path.dirname(__file__)))
    
    # Start LocalNet
    subprocess.run(["algokit", "localnet", "start"])
    
    # Build the smart contract
    subprocess.run(["python", "smart_contracts/manage/scripts/build.py"])
    
    # Deploy the smart contract
    subprocess.run(["python", "smart_contracts/manage/scripts/deploy.py"])
    
    # Start the frontend
    subprocess.run(["python", "frontend/scripts/start.py"])

if __name__ == "__main__":
    main() 
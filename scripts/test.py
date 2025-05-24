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
    
    # Run the smart contract tests
    subprocess.run(["python", "smart_contracts/manage/scripts/test.py"])
    
    # Run the frontend tests
    subprocess.run(["python", "frontend/scripts/test.py"])

if __name__ == "__main__":
    main() 
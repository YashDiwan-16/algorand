#!/usr/bin/env python3

import os
import sys
import json
import subprocess

def main():
    # Change to the project directory
    os.chdir(os.path.dirname(os.path.dirname(__file__)))
    
    # Build the smart contract
    subprocess.run(["python", "smart_contracts/manage/scripts/build.py"])
    
    # Build the frontend
    subprocess.run(["python", "frontend/scripts/build.py"])
    
    print("Built project successfully!")

if __name__ == "__main__":
    main() 
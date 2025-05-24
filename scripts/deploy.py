#!/usr/bin/env python3

import os
import sys
import json
import subprocess

def main():
    # Change to the project directory
    os.chdir(os.path.dirname(os.path.dirname(__file__)))
    
    # Build the project
    subprocess.run(["python", "scripts/build.py"])
    
    # Deploy to TestNet
    subprocess.run(["algokit", "project", "deploy", "--network", "testnet"])
    
    print("Deployed project to TestNet successfully!")

if __name__ == "__main__":
    main() 
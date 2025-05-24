#!/usr/bin/env python3

import os
import sys
import json
import shutil

def main():
    # Change to the project directory
    os.chdir(os.path.dirname(os.path.dirname(__file__)))
    
    # Clean the smart contract
    if os.path.exists("smart_contracts/manage/approval.teal"):
        os.remove("smart_contracts/manage/approval.teal")
    if os.path.exists("smart_contracts/manage/clear.teal"):
        os.remove("smart_contracts/manage/clear.teal")
    if os.path.exists("smart_contracts/manage/app_id.json"):
        os.remove("smart_contracts/manage/app_id.json")
    
    # Clean the frontend
    if os.path.exists("frontend/build"):
        shutil.rmtree("frontend/build")
    if os.path.exists("frontend/node_modules"):
        shutil.rmtree("frontend/node_modules")
    
    print("Cleaned project successfully!")

if __name__ == "__main__":
    main() 
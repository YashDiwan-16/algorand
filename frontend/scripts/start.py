#!/usr/bin/env python3

import os
import sys
import json
import subprocess

def main():
    # Change to the frontend directory
    os.chdir(os.path.join(os.path.dirname(__file__), ".."))
    
    # Install dependencies
    subprocess.run(["npm", "install"])
    
    # Start the development server
    subprocess.run(["npm", "start"])

if __name__ == "__main__":
    main() 
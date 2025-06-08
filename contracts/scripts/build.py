#!/usr/bin/env python3

import os
import sys
import json
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from pyteal import compileTeal, Mode
from contract import get_approval_program, get_clear_program

def main():
    # Compile the approval program
    approval_teal = compileTeal(get_approval_program(), mode=Mode.Application, version=6)
    with open("approval.teal", "w") as f:
        f.write(approval_teal)
    
    # Compile the clear program
    clear_teal = compileTeal(get_clear_program(), mode=Mode.Application, version=6)
    with open("clear.teal", "w") as f:
        f.write(clear_teal)
    
    print("Compiled smart contract successfully!")

if __name__ == "__main__":
    main() 
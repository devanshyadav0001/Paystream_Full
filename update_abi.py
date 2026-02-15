import shutil
import os
import time

source = r"c:\Users\devan\OneDrive\Documents\Paystream reboot\contracts\artifacts\contracts\PayStream.sol\PayStream.json"
dest = r"c:\Users\devan\OneDrive\Documents\Paystream reboot\frontend\src\hooks\PayStream.json"

print(f"Attempting to copy from {source} to {dest}")

try:
    shutil.copy2(source, dest)
    print("Copy successful!")
except Exception as e:
    print(f"Copy failed: {e}")

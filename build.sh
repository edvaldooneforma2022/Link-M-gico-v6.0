#!/usr/bin/env bash
# Exit on first error
set -e

# Install Python dependencies
pip install -r requirements.txt

# If you don't have any Node.js dependencies, you can remove or comment out the npm lines.

echo "Build completed successfully!"

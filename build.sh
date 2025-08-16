#!/usr/bin/env bash
# Exit on first error
set -e

# Install Python dependencies
pip install -r requirements.txt

# Optional: If you have any Node.js dependencies for frontend build, add them here.
# For example, if you use Webpack or Vite to build your frontend assets:
# npm install
# npm run build

# If you don't have any Node.js dependencies, you can remove or comment out the npm lines.

# Ensure the static files are in the correct location for Flask
# This step might not be necessary if your Flask app serves static files directly from src/static
# For example, if your frontend build outputs to a 'dist' folder:
# cp -r frontend/dist/* src/static/

echo "Build completed successfully!"


#!/bin/sh

# Log the current directory
echo "Current directory: $(pwd)"

# Log the contents of the /app directory
echo "Contents of /app:"
ls -la /app

# Install dependencies
npm install

npm audit fix --force

# Log the contents of the node_modules directory
echo "Contents of /app/node_modules:"
ls -la /app/node_modules

# Start Vite in dev mode
npm run dev -- --host
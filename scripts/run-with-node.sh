#!/bin/bash
# Automatically detect and use the current Node.js from nvm
# This ensures scripts run with the correct Node.js version that supports crypto.hash

# Unset npm_config_prefix to avoid conflicts with nvm
unset npm_config_prefix

# Try to initialize nvm if available
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  \. "$NVM_DIR/nvm.sh"
fi

# Fallback: Use explicit path to Node.js v22.15.0 if nvm didn't work
# This ensures it works even in Cursor's script runner context
NODE_PATH="${NVM_DIR}/versions/node/v22.15.0/bin/node"

# Check if the explicit path exists, otherwise use 'node' from PATH
if [ -f "$NODE_PATH" ]; then
  exec "$NODE_PATH" "$@"
else
  # Fallback to system node (should work in terminal)
  exec node "$@"
fi


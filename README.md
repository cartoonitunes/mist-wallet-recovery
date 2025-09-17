# Mist 0.6.0 - Wallet Recovery Fork

**⚠️ IMPORTANT**: This is a **modified fork** of the original Ethereum Mist 0.6.0 browser, specifically created to help users recover wallets from the 9-year-old Mist version.

## Purpose

This repository contains the Ethereum Mist wallet code from 2016, modified to work with external RPC providers instead of requiring a local Ethereum node. The primary purpose is to help users who created wallets in the original Mist 0.6.0 and need to recover them using their keystore file and password.

## What Was Modified

1. **Web3 Provider**: Changed from IPC (Inter-Process Communication) to HTTP RPC
2. **Node Startup**: Bypassed the local node startup process  
3. **RPC Configuration**: All web3 connections now use external RPC providers
4. **Recovery Tools**: Added dedicated wallet recovery scripts and interfaces

## Quick Start

If you just want to recover your wallet quickly:

1. **Install Node.js 8.17.0** using nvm (see Prerequisites below)
2. **Get an Infura API key** (free at infura.io)
3. **Run**: `node wallet-recovery.js https://mainnet.infura.io/v3/YOUR_PROJECT_ID`
4. **Enter your keystore file path and password**

That's it! The script will recover your wallet and show you the private key.

## Prerequisites & Setup

**IMPORTANT**: Before attempting wallet recovery, you must set up the environment properly.

### Required Software

1. **Node.js Version 8.17.0** (exact version required for compatibility)
2. **npm** (comes with Node.js)
3. **An Ethereum RPC provider** (Infura, Alchemy, or local node)

### Installation Steps

#### Step 1: Install Node Version Manager (nvm)
```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reload your shell
source ~/.bashrc  # or ~/.zshrc depending on your shell
```

#### Step 2: Install and Use the Correct Node.js Version
```bash
# Install Node.js 8.17.0
nvm install 8.17.0
nvm use 8.17.0

# Verify the version
node --version  # Should show v8.17.0
npm --version   # Should show 5.x.x
```

#### Step 3: Install Project Dependencies
```bash
# Navigate to the project directory
cd mist-0.6.0

# Install dependencies
npm install --production
```

#### Step 4: Set Up Ethereum RPC Access

**Option A: Use a Public RPC Service (Easiest)**
- Sign up for [Infura](https://infura.io) (free tier available)
- Get your project ID
- Use URL: `https://mainnet.infura.io/v3/YOUR_PROJECT_ID`

**Option B: Use a Local Ethereum Node**
```bash
# Install geth (if not already installed)
# On macOS:
brew install ethereum/ethereum/geth

# Start geth with HTTP RPC
geth --http --http.addr "0.0.0.0" --http.port 8545
```


## Recovery Methods

**⚠️ IMPORTANT**: Complete the Prerequisites & Setup section above before attempting any recovery method.

### Method 1: Using the Recovery Script (Recommended)

This is the easiest and most reliable method.

1. **Ensure you have an Ethereum RPC provider** (see Step 4 in Prerequisites)

2. **Run the recovery script**:
   ```bash
   node wallet-recovery.js [RPC_URL]
   ```
   
   Examples:
   ```bash
   # Using Infura (recommended)
   node wallet-recovery.js https://mainnet.infura.io/v3/YOUR_PROJECT_ID
   
   # Using local geth node
   node wallet-recovery.js http://localhost:8545
   
   # Using Alchemy
   node wallet-recovery.js https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY
   ```

3. **Follow the prompts** to enter your keystore file path and password

### Method 2: Using the Web Interface

1. **Ensure you have an Ethereum RPC provider** (see Step 4 in Prerequisites)

2. **Start a simple HTTP server** (required for CORS):
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Or Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using Node.js
   npx http-server
   ```

3. **Open the test file** in a web browser:
   ```
   http://localhost:8000/test-wallet.html
   ```

4. **Upload your keystore file** and enter your password

### Method 3: Running the Full Mist Application (Advanced)

**Note**: This method is more complex and may require additional setup.

1. **Complete all prerequisites** (Node.js 8.17.0, dependencies, etc.)

2. **Start an Ethereum RPC provider** (see Step 4 in Prerequisites)

3. **Run the application**:
   ```bash
   node main.js
   ```

**Troubleshooting for Method 3**:
- If you get "Cannot find module 'electron'", this method won't work
- Use Method 1 (recovery script) instead


## Important Notes

### Keystore File Location

The original Mist wallet stored keystore files in:
- **Mac**: `~/Library/Application Support/Mist/keystore/`
- **Windows**: `C:\Users\[username]\AppData\Roaming\Mist\keystore\`
- **Linux**: `~/.config/Mist/keystore/`

### Security Warnings

⚠️ **CRITICAL**: Never share your private key with anyone!
⚠️ **CRITICAL**: Make sure you're using a secure RPC provider!
⚠️ **CRITICAL**: Verify the address matches your expected wallet address!

## Troubleshooting

### Common Issues

1. **"Cannot find module 'electron'"**
   - The application requires Electron to run. Try using the recovery script instead.

2. **"Error connecting to Ethereum node"**
   - Make sure your Ethereum node is running and accessible
   - Check the RPC URL is correct
   - Verify the node supports JSON-RPC

3. **"Error recovering wallet"**
   - Double-check your password
   - Verify the keystore file is not corrupted
   - Make sure you're using the correct keystore file

4. **"Incompatible keystore format"**
   - This version of Mist uses an older keystore format
   - The recovery script should handle the decryption correctly

## Technical Details

### Web3 Version
This version uses Web3.js 0.15.1, which is compatible with the keystore format used by Mist 0.6.0.

### Keystore Format
The keystore files use the standard Ethereum keystore format with:
- AES-128-CTR encryption
- PBKDF2 key derivation
- Scrypt key derivation (for newer versions)

### Network Compatibility
This setup works with:
- Ethereum Mainnet
- Ethereum Testnets (Ropsten, Rinkeby, etc.)
- Any Ethereum-compatible network with JSON-RPC support

## Testing the Recovery System

Before attempting to recover a real wallet, you can test the system to ensure everything is working correctly:

### Quick Test
```bash
# Run the basic functionality test
node test-wallet-recovery.js

# Run the keystore decryption test
node test-keystore-decryption.js

# Run the recovery process demo
node test-recovery-demo.js
```

### What the Tests Check
- ✅ Web3.js compatibility and initialization
- ✅ Keystore file structure validation
- ✅ RPC provider functionality
- ✅ Recovery script availability
- ✅ Web interface availability
- ✅ Dependencies installation

### Test Results
If all tests pass, the wallet recovery system is ready to use. If any tests fail, check the setup instructions above.

## Success!

Once you've successfully recovered your wallet, you should see:
- Your wallet address
- Your private key (keep this secure!)
- Your wallet balance (if connected to mainnet)

You can then import this wallet into any modern Ethereum wallet like MetaMask, MyEtherWallet, or any other compatible wallet.

## Original Mist 0.6.0 Information

This is a fork of the original [Ethereum Mist 0.6.0](https://github.com/ethereum/mist) browser. The original Mist browser was the tool of choice to browse and use Ðapps in 2016.

### Original Development Setup

For reference, the original development setup required:
- Electron version 0.37.2
- Node.js and npm
- Meteor for the frontend
- Local geth node for blockchain interaction

The original Mist is no longer maintained and this fork is specifically for wallet recovery purposes only.

## License

This project maintains the same GPL-3.0 license as the original Mist project.

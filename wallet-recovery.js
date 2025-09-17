#!/usr/bin/env node

/**
 * Mist Wallet Recovery Script
 * 
 * This script helps recover a wallet from the old Mist version
 * by using the same web3 version and keystore decryption method.
 */

const Web3 = require('web3');
const fs = require('fs');
const readline = require('readline');

// Initialize web3 with external RPC
const web3 = new Web3(new Web3.providers.HttpProvider(process.argv[2] || 'http://localhost:8545'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Mist Wallet Recovery Tool');
console.log('========================');
console.log('');

// Test connection
console.log('Testing connection to Ethereum node...');
web3.eth.getBlock(0, function(error, result) {
    if (error) {
        console.error('Error connecting to Ethereum node:', error.message);
        console.error('Make sure you have an Ethereum node running on the specified RPC URL');
        process.exit(1);
    }
    
    const network = result.hash === '0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3' ? 'Mainnet' : 'Other';
    console.log('✓ Connected to Ethereum node. Network:', network);
    console.log('');
    
    startRecovery();
});

function startRecovery() {
    rl.question('Enter the path to your keystore file: ', (keystorePath) => {
        if (!fs.existsSync(keystorePath)) {
            console.error('Error: Keystore file not found at:', keystorePath);
            process.exit(1);
        }
        
        try {
            const keystore = JSON.parse(fs.readFileSync(keystorePath, 'utf8'));
            console.log('✓ Keystore file loaded successfully');
            console.log('Keystore version:', keystore.version || 'unknown');
            console.log('Keystore crypto:', keystore.crypto ? 'present' : 'missing');
            console.log('');
            
            rl.question('Enter your wallet password: ', (password) => {
                try {
                    console.log('Attempting to decrypt wallet...');
                    const account = web3.eth.accounts.decrypt(keystore, password);
                    
                    console.log('');
                    console.log('✓ WALLET RECOVERED SUCCESSFULLY!');
                    console.log('================================');
                    console.log('Address:', account.address);
                    console.log('Private Key:', account.privateKey);
                    console.log('');
                    console.log('⚠️  WARNING: Keep your private key secure and never share it!');
                    console.log('⚠️  Anyone with access to your private key can control your wallet!');
                    console.log('');
                    
                    // Check balance
                    web3.eth.getBalance(account.address, function(error, balance) {
                        if (!error) {
                            const balanceEth = web3.fromWei(balance, 'ether');
                            console.log('Wallet Balance:', balanceEth.toString(), 'ETH');
                        }
                    });
                    
                } catch (error) {
                    console.error('');
                    console.error('❌ Error recovering wallet:', error.message);
                    console.error('');
                    console.error('This could be due to:');
                    console.error('- Incorrect password');
                    console.error('- Corrupted keystore file');
                    console.error('- Incompatible keystore format');
                    console.error('');
                    console.error('Please double-check your password and try again.');
                }
                
                rl.close();
            });
            
        } catch (error) {
            console.error('Error reading keystore file:', error.message);
            process.exit(1);
        }
    });
}

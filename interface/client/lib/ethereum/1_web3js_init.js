// set providor
if(typeof web3 !== 'undefined')
  web3 = new Web3(web3.currentProvider);
else
  // Use HTTP RPC instead of IPC for external node connection
  // You can change this URL to point to your preferred Ethereum node
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  
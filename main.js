const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var accounts = web3.eth.accounts;

const code = fs.readFileSync('asset-contract.sol').toString();
var compiledCode = solc.compile(code);

var abiDefinition = JSON.parse(compiledCode.contracts[':AssetManagement'].interface);
var AssetsContract = web3.eth.contract(abiDefinition);
var byteCode = compiledCode.contracts[':AssetManagement'].bytecode;
var deployedContract = AssetsContract.new({data: byteCode, from: web3.eth.accounts[5], gas: 4700000});
var address = deployedContract.address;

const contractInstance = AssetsContract.at(address);

// module.exports = contractInstance;
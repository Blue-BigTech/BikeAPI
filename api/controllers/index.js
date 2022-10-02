const fs = require('fs')
const Web3 = require('web3')
const { matchedData } = require('express-validator')
const { raw } = require('body-parser')
const Common = require('ethereumjs-common')
const web3 = new Web3(new Web3.providers.HttpProvider('https://rpc-mumbai.maticvigil.com/'))


const transfer = async (req, res) => {
  const data = matchedData(req)
  const rootPath = __dirname.substring(0, __dirname.indexOf('api'));
  const abi = fs.readFileSync('abi/AKYT.json','utf-8')
  
  const myAddress = "0xC4005Bc827dd003629C95D9Ca62873b8a053d2F9"
  const toAddress = "0x321D181c7e4D777C577DCBf78db75bB70a227df4"
  const contractAddress = "0x803c7E3e7db4CD812D48623CAFFC6bd84bE16E8D"
  const amount = web3.utils.toHex(100);
  
  let count = await web3.eth.getTransactionCount(myAddress)
  console.log(count)
  var privateKey = new Buffer.from('68ddf6cc1cccaffaffc46c6899222a19a95a57f5232a938ed55c0ebce41230af', 'hex');
  const contract = new web3.eth.Contract(JSON.parse(abi), contractAddress, {from: myAddress})
  let rawData = contract.methods.transfer(toAddress, amount).encodeABI();
  let gasPrice = web3.eth.gasPrice;
  const rawTransaction = {
    "from":myAddress, 
    "gasPrice":web3.utils.toHex(gasPrice),
    "gasLimit":web3.utils.toHex(210000),
    "to":contractAddress,
    "value":"0x0",
    "data": rawData,
    "nonce":web3.utils.toHex(count)
  }
  var Tx = require('@ethereumjs/tx').Transaction;
  // const commonMatic = Common.default.forCustomChain(
  //   'matic',
  //   {
  //     name: 'matic-testnet',
  //     networkId: 80001,
  //     chainId: 80001,
  //     url: 'https://rpc-mumbai.maticvigil.com/'
  //   },
  //   'petersburg'
  // )

  const common = Common.default.forCustomChain(
    'ropsten', 
    {
      name: 'eth',
      networkId: 3,
      chainId: 3
    },
  'petersburg'
  );
  
  var tx = new Tx(rawTransaction, { common: common },);
  const signedTx = tx.sign(privateKey)
  const serializedTx = signedTx.serialize();
  // const transaction = new Transaction(rawTransaction)
  // transaction.sign(privateKey)
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    .on('receipt', console.log)

  const balance = await contract.methods.balanceOf(myAddress).call();

  res.status(200).json({ transfer: 'ok', balance })
}

const mint = async (req, res) => {
  res.status(200).json({ mint: 'ok' })
}

module.exports = {
  transfer,
  mint
}

/*
var count = web3.eth.getTransactionCount("0x26...");
var abiArray = JSON.parse(fs.readFileSync('mycoin.json', 'utf-8'));
var contractAddress = "0x8...";
var contract = web3.eth.contract(abiArray).at(contractAddress);
var rawTransaction = {
    "from": "0x26...",
    "nonce": web3.toHex(count),
    "gasPrice": "0x04e3b29200",
    "gasLimit": "0x7458",
    "to": contractAddress,
    "value": "0x0",
    "data": contract.transfer.getData("0xCb...", 10, {from: "0x26..."}),
    "chainId": 0x03
};

var privKey = new Buffer('fc3...', 'hex');
var tx = new Tx(rawTransaction);

tx.sign(privKey);
var serializedTx = tx.serialize();

web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
    if (!err)
        console.log(hash);
    else
        console.log(err);
});
*/
const fs = require('fs');
const { matchedData } = require('express-validator')
const { POSClient, use } = require('@maticnetwork/maticjs')
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const HDWalletProvider = require('@truffle/hdwallet-provider')

use(Web3ClientPlugin)

const privateKey = process.env.PRIVATE_KEY;
const childRPC = process.env.CHILD_RPC;
const mainRPC = process.env.MAIN_RPC;
const contractAddress = process.env.CONTRACT_ADDR;
const coinbaseAddress = process.env.COINBASE_ADDR;

const transfer = async (req, res) => {
  const data = matchedData(req)
  // const rootPath = __dirname.substring(0, __dirname.indexOf('api'));
  // const abi = fs.readFileSync('abi/AKYT.json','utf-8')

  const posClient = new POSClient();
  (async () => {
    await posClient.init({
      network: 'testnet',
      version: 'mumbai',
      parent: {
        provider: new HDWalletProvider(privateKey, mainRPC),
        defaultConfig: {
          from : coinbaseAddress
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, childRPC),
        defaultConfig: {
          from : coinbaseAddress
        }
      }
    });
  })();
  
  // const erc20token = posClient.erc20(contractAddress,true);
  // const erc20ChildToken = posClient.erc20(contractAddress);
  // const balance = await erc20ChildToken.getBalance(coinbaseAddress)
  // console.log('balance', balance)

  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider(
  //     `https://${network}.infura.io/v3/${ifura_api_key}`
  //   )
  // );
  // let contract = new web3.eth.Contract(JSON.parse(abi), contractAddress);
  // let amount = data.amount;
  // let result = contract.methods.transfer(data.receiver, amount).encodeABI();
  
  // let txObj  = {
  //   gas: "0x186A0",
  //   "to": contractAddress,
  //   "value": "0x00",
  //   "data": result,
  //   "from": coinbaseAddress
  // }

  // web3.eth.accounts.signTransaction(txObj, privateKey, (err, signedTx) => {
  //      if (err) {
  //          return callback(err)
  //      } else {
  //          console.log(signedTx)
  //          return web3.eth.sendSignedTransaction(signedTx.rawTransaction, (err, res) => {
  //              if (err) {
  //                  console.log(err)
  //              } else {
  //                  console.log(res)
  //              }
  //          })
  //      }
  // })

  res.status(200).json({ transfer: 'ok' })
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
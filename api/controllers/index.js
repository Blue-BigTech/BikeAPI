const fs = require('fs');
const { matchedData } = require('express-validator')
const { pos } = require('../../config')
const { getPOSClient, to } = require('../utils/POSClient')

const transferERC20 = async () => {
  const client = await getPOSClient();
  const erc20Token = client.erc20(pos.parent.erc20, true);

  const result = await erc20Token.transfer(100, to, {
      gasPrice: '30000000000',
  });

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}

const transfer = async (req, res) => {
  const data = matchedData(req)
  // const rootPath = __dirname.substring(0, __dirname.indexOf('api'));
  // const abi = fs.readFileSync('abi/AKYT.json','utf-8')

  transferERC20().then(() => {
  }).catch(err => {
      console.error("err", err);
  }).finally(_ => {
      process.exit(0);
  })
  
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
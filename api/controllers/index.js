const fs = require('fs')
const { matchedData } = require('express-validator')
const { raw } = require('body-parser')
const Web3 = require('web3')
const Provider = require('@truffle/hdwallet-provider');
const BN = require('bn.js')

const transfer = async (req, res) => {
  const data = matchedData(req)
  const abi = fs.readFileSync('abi/AKYT.json','utf-8')
  
  const RECEIVER = data.receiver;
  const { 
    PRIVATE_KEY ,
    COINBASE_ADDR,
    AKTY_ADDR,
    TO_ADDR1,
    TO_ADDR2,
    TO_ADDR3,
    TO_ADDR4,
    TO_ADDR5,
    TO_ADDR6,
    RPC_URL,
  } = process.env;

  const provider = new Provider(PRIVATE_KEY, RPC_URL);
  const web3 = new Web3(provider);
  const myContract = new web3.eth.Contract(JSON.parse(abi), AKTY_ADDR);
  const TotalAmount = data.amount;
  const DIST_ATKY = parseInt(TotalAmount * 0.4 / 6);
  const EARN_ATKY = TotalAmount - DIST_ATKY * 6;
  const bn_EARN_ATKY = new BN(EARN_ATKY, 10);
  const bn_DIST_ATKY = new BN(DIST_ATKY, 10);
  let bn_EARN = new BN("1000000000000000000").mul(bn_EARN_ATKY)
  let bn_DIST = new BN("1000000000000000000").mul(bn_DIST_ATKY)
  
  const receipt = await myContract.methods.transfer(RECEIVER, bn_EARN).send({ from: COINBASE_ADDR });
  console.log(receipt);
  const receipt1 = await myContract.methods.transfer(TO_ADDR1, bn_DIST).send({ from: COINBASE_ADDR });
  console.log(receipt1);
  const receipt2 = await myContract.methods.transfer(TO_ADDR2, bn_DIST).send({ from: COINBASE_ADDR });
  console.log(receipt2);
  const receipt3 = await myContract.methods.transfer(TO_ADDR3, bn_DIST).send({ from: COINBASE_ADDR });
  console.log(receipt3);
  const receipt4 = await myContract.methods.transfer(TO_ADDR4, bn_DIST).send({ from: COINBASE_ADDR });
  console.log(receipt4);
  const receipt5 = await myContract.methods.transfer(TO_ADDR5, bn_DIST).send({ from: COINBASE_ADDR });
  console.log(receipt5);
  const receipt6 = await myContract.methods.transfer(TO_ADDR6, bn_DIST).send({ from: COINBASE_ADDR });
  console.log(receipt6);
  res.status(200).json({ Transfer: 'SUCCESS' })
}

module.exports = {
  transfer
}
const { matchedData } = require('express-validator')

const transfer = async (req, res) => {
  const data = matchedData(req)

  console.log(data.receiver);
  console.log(data.amount);
  res.status(200).json({ transfer: 'ok' })
}

const mint = async (req, res) => {
  res.status(200).json({ mint: 'ok' })
}

module.exports = {
  transfer,
  mint
}
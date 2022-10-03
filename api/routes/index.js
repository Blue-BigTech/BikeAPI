const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request')
router.post('/test', (req, res) => {
  res.send({message : 'API'})
})

const {validateTransaction} = require('../validators/validateTransaction')
const {transfer} = require('../controllers/index')

router.get('/transfer', trimRequest.all, validateTransaction, transfer)

module.exports = router;
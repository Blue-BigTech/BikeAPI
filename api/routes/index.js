const express = require('express');
const router = express.Router();
const trimRequest = require('trim-request')
router.post('/test', (req, res) => {
  res.send({message : 'API'})
})

const {validateTransaction} = require('../validators/validateTransaction')
const {transfer, mint} = require('../controllers/index')

router.get('/transfer', trimRequest.all,validateTransaction, transfer)
router.get('/mint', trimRequest.all, validateTransaction, mint)

module.exports = router;
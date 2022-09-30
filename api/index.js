const express = require('express');
const router = express.Router();

router.post('/test', (req, res) => {
  res.send({message : 'API'})
})

module.exports = router;
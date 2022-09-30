const { validateResult } = require('../utils/validateResult')
const { check } = require('express-validator')

const validateTransaction = [
  check('receiver')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('IS_EMPTY')
    .isLength({
      length: 42
    })
    .withMessage('RECEIVER_ADDRESS_INVALID'),
  check('amount')
    .exists()
    .withMessage('MISSING')
    .not()
    .isEmpty()
    .withMessage('MISSING')
    .isNumeric()
    .withMessage('AMOUNT_MUST_NUMBER'),
    (req, res, next) => {
      validateResult(req, res, next)
    }
]

module.exports = {validateTransaction}
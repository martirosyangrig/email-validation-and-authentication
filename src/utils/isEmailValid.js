const emailValidator = require('deep-email-validator');

module.exports = async function isEmailValid(email) {
    return emailValidator.validate(email)
  }
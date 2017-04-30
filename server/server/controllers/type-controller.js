let AccountType = require('mongoose').model('AccountType')

module.exports = {
  getAllTypes: (req, res) => {
    AccountType
    .find()
    .then(accountTypes => {
      res.json({'accountTypes': accountTypes})
    })
    .catch(err => {
      res.json({'error': err})
    })
  }
}

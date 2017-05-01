let AccountType = require('mongoose').model('AccountType')

module.exports = {
  // route to get all account types
  getAllTypes: (req, res) => {
    AccountType.find().then(accountTypes => {
      res.json({'accountTypes': accountTypes})
    }).catch(err => {
      res.json({'error': err})
    })
  }
}

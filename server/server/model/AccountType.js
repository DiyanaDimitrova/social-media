const mongoose = require('mongoose')

//model for Account type collection
let accountTypeSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  icon: {
    type: String
  }
})

let AccountType = mongoose.model('AccountType', accountTypeSchema)

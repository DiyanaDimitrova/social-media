const mongoose = require('mongoose')

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

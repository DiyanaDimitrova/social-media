const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

let postSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  author: {
    type: String
  },
  date: {
    type: Date
  },
  socialAccountType: {
    type: Number
  },
  content: {
    type: String
  }
})

postSchema.plugin(mongoosePaginate)
let Post = mongoose.model('Post', postSchema)

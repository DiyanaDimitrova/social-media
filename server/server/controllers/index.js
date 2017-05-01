let typeController = require('./type-controller')
let postController = require('./post-controller')
// main controller
module.exports = {
  type: typeController,
  post: postController
}

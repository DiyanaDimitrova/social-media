let Post = require('mongoose').model('Post')

module.exports = {
  getAllPosts: (req, res) => {
    Post
    .find()
    .then(posts => {
      res.json({'posts': posts})
    })
    .catch(err => {
      res.json({'error': err})
    })
  },
  getAllPostsPaginated: (req, res) => {
    console.log(req.params)
    Post
    .paginate({}, { sort: { date: -1 }, offset: Number(req.params.offset), limit: Number(req.params.limit) })
    .then(posts => {
      res.json({'posts': posts})
    })
    .catch(err => {
      res.json({'error': err})
    })
  }
}

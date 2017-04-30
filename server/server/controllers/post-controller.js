let Post = require('mongoose').model('Post')
module.exports = {
  getAllPosts: (req, res) => {
    let searchType = {}
    if (req.params.type !== 'all') {
      searchType = {
        socialAccountType: req.params.type
      }
    }
    Post
    .find(searchType)
    .sort({ date: -1 })
    .then(posts => {
      res.json({'posts': posts})
    })
    .catch(err => {
      res.json({'error': err})
    })
  },
  getAllPostsPaginated: (req, res) => {
    let searchType = {}
    if (req.params.type !== 'all') {
      searchType = {
        socialAccountType: req.params.type
      }
    }
    Post
    .paginate(searchType, { sort: { date: -1 }, offset: Number(req.params.offset), limit: Number(req.params.limit) })
    .then(posts => {
      res.json({'posts': posts})
    })
    .catch(err => {
      res.json({'error': err})
    })
  }
}

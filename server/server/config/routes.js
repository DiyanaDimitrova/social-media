const controllers = require('../controllers')

// all routes of the application
module.exports = (app) => {
  app.get('/types', controllers.type.getAllTypes)
  app.get('/posts/:type', controllers.post.getAllPosts)
  app.get('/posts/:type/:offset/:limit', controllers.post.getAllPostsPaginated)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('Not Found')
    res.end()
  })
}

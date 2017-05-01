const path = require('path')

let rootPath = path.normalize(path.join(__dirname, '/../../'))

// configuration for the db and server port
module.exports = {
  development: {
    rootPath: rootPath,
    db: 'mongodb://test:test@ds113841.mlab.com:13841/sentiment-task',
    port: 1337
  },
  production: {
    rootPath: rootPath,
    db: process.env.MONGO_DB_CONN_STRING,
    port: process.env.port
  }
}

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

module.exports = (config, app) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(config.rootPath + 'public'))
}

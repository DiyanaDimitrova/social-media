const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

module.exports = (config, app) => {
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
}

require('dotenv').config()

const express = require('express')
const { dbConnect } = require('./helpers/database.helper')
const { expressLogger: logger } = require('./helpers/logger.helper')
const routes = require('./routes')

class App {
  constructor() {
    this.express = express()
    dbConnect()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(logger)
    this.express.use(express.urlencoded({
      extended: false,
    }))
  }

  routes() {
    this.express.use('/api/v1', routes)
  }
}

module.exports = new App().express

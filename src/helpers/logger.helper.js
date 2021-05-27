const pino = require('pino')
const expressPino = require('express-pino-logger')

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  prettyPrint: process.env.NODE_ENV !== 'production',
  levelFirst: false,
})

const expressLogger = expressPino({ logger })

module.exports = { expressLogger, logger }

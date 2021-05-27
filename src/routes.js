const express = require('express')
const command = require('./controllers/command.controller')
const MessageHelper = require('./helpers/message.helper')
const TelegramService = require('./services/telegram.service')

const router = express.Router()

module.exports = router
  .get('/healthcheck', (_req, res) => {
    const uptime = process.uptime()
    res.json({ uptime, env: process.env.NODE_ENV })
  })
  .post('/message', async (req, res) => {
    const { message } = req.body
    const { action, response } = await command.execute(message)
    const text = MessageHelper
      .create(response)
      .playersFactions()
      .world()
      .build()
    await TelegramService.sendMessage(response.chatId, text)
    res.json({
      message, response, text, action,
    })
  })

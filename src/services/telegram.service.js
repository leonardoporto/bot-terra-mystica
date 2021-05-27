const axios = require('axios')

const { TELEGRAM_BOT_TOKEN } = process.env

class TelegramService {
  constructor() {
    this.endpoint = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/`
  }

  sendMessage(chatId, message) {
    return axios.post(`${this.endpoint}sendMessage`, {
      chat_id: chatId,
      text: message,
    })
  }
}

module.exports = new TelegramService()

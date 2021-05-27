const Group = require('../models/group.model')

const GameController = require('./game.controller')

class Command {
  constructor(message) {
    this.message = message
  }

  async execute({ text, chat }) {
    const regex = /\/(?<command>.+) (?<parameters>.+)/
    const { groups: { command, parameters } } = regex.exec(text)
    return { action: command, response: await this[command](chat, parameters) }
  }

  init(chat, params) {
    const [enableFireIce, enableMerchantsOfTheSeas] = params.split(',')
    const groupData = {
      chatId: chat.id,
      configuration: {
        enableFireIce: enableFireIce || false,
        enableMerchantsOfTheSeas: enableMerchantsOfTheSeas || false,
      },
    }
    return Group.findOneAndUpdate(
      { chatId: groupData.chatId },
      groupData,
      { upsert: true, new: true },
    )
  }

  async start(chat, params) {
    const group = await Group.findOne({ chatId: chat.id })
    const players = params.split(',')
    return new GameController().create(group.groupId, chat.id, players)
  }

  async finish(chat, params) {
    const group = await Group.findOne({ chatId: chat.id })
    const players = params.split(',')
      .map((item) => item.split(':'))
      .sort(([_a, valueA], [_b, valueB]) => {
        if (valueA > valueB) {
          return 1
        }
        if (valueA < valueB) {
          return -1
        }
        // a must be equal to b
        return 0
      })
      .reduce((response, [player, vp]) => {
        response[player] = vp
        return response
      }, {})

    return new GameController().finish(group.groupId, players)
  }
}

module.exports = new Command()

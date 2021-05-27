const { random } = require('../helpers/fixtures.helper')
const data = require('../../data/base.json')
const Game = require('../models/game.model')

class GameController {
  constructor() {
    const { factions, worlds, colors2Land } = data
    this.data = factions
    this.worlds = worlds
    this.colors2Land = colors2Land
    this.colors = Object.keys(this.data)
    this.defaultColors = Object.keys(this.colors2Land)
  }

  create(groupId, chatId, players) {
    const playersData = this.allRandom(players)
    const world = this.choiceMap()
    const gameData = playersData.reduce((game, playerData, index) => {
      game.players[`player${index + 1}`] = {
        nickname: playerData.player,
        faction: playerData.faction.name,
        homeland: playerData.homeland,
        vp: 0,
        winner: false,
      }
      return game
    }, {
      world, groupId, chatId, players: {},
    })

    return Game.create(gameData)
  }

  async finish(groupId, players) {
    let game = await Game.findOne({ groupId, finishedAt: null })

    if (!game) {
      throw new Error('Game not found')
    }

    game = this.addVictoryPoints(game, players)
    game.finishedAt = new Date()

    return game.save()
  }

  addVictoryPoints(game, players) {
    try {
      return Object.keys(game.players).reduce((gameData, key) => {
        const { nickname } = gameData.players[key]
        gameData.players[key].vp = players[nickname]
        return gameData
      }, { game })
    } catch (e) {
      throw new Error('player not exists')
    }
  }

  defineWinner(players) {
    return Object.keys(players).reduce((response, nickname) => {
      response[nickname] = { vp: players[nickname] }
      return response
    }, {})
  }

  allRandom(players) {
    return players.map((player) => {
      const color = this._getColor()
      const faction = this._pickFaction(color)
      const homeland = this.colors2Land[this._choiceColor(faction) || color]
      return {
        player,
        color,
        faction,
        homeland,
      }
    })
  }

  banColor(color) {
    if (this.colors.indexOf(color) >= 0) {
      this.colors.splice(this.colors.indexOf(color), 1)
      this.defaultColors.splice(this.defaultColors.indexOf(color), 1)
      return true
    }
    return false
  }

  banFaction(faction) {
    let response = false
    this.colors.forEach((color) => {
      if (this.data[color].indexOf(faction) >= 0) {
        response = true
        this.data[color].splice(this.data[color].indexOf(faction), 1)
        if (this.data[color].length === 0) {
          this.banColor(color)
        }
      }
    })
    return response
  }

  choiceMap() {
    return this._getWorld()
  }

  _getColor() {
    const color = this.colors[random(this.colors.length)]
    this.colors.splice(this.colors.indexOf(color), 1)
    this.defaultColors.splice(this.defaultColors.indexOf(color), 1)
    return color
  }

  _pickFaction(color) {
    return this.data[color][random(this.data[color].length)]
  }

  _getWorld() {
    return this.worlds[random(this.worlds.length)]
  }

  _choiceColor(faction) {
    if (faction.expansion) {
      const color = this.defaultColors[random(this.defaultColors.length)]
      this.banColor(color)
      return color
    }
    return null
  }
}

module.exports = GameController

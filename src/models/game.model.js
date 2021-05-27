const uuid = require('node-uuid')
const mongoose = require('mongoose')

const { Schema } = mongoose

const playerSchema = Schema({
  nickname: { type: String, required: true },
  faction: { type: String, required: true },
  homeland: { type: String, required: true },
  vp: { type: Number, required: true },
  winner: { type: Boolean, required: true },
})

const game = new Schema({
  gameId: { type: String, default: uuid.v4 },
  groupId: { type: String, required: true },
  chatId: { type: String, required: true },
  world: { type: String, required: true },
  startedAt: { type: Date, default: Date.now() },
  finishedAt: { type: Date },
  players: {
    player1: {
      type: playerSchema,
      required: true,
    },
    player2: {
      type: playerSchema,
      required: true,
    },
    player3: {
      type: playerSchema,
      required: false,
    },
    player4: {
      type: playerSchema,
      required: false,
    },
    player5: {
      type: playerSchema,
      required: false,
    },
  },
})

module.exports = mongoose.model('Game', game)

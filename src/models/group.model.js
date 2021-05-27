const uuid = require('node-uuid')
const mongoose = require('mongoose')

const { Schema } = mongoose
const group = new Schema({
  groupId: {
    type: String,
    default: uuid.v4,
  },
  chatId: {
    type: String,
    index: {
      unique: true,
    },
  },
  configuration: {
    enableFireIce: {
      type: Boolean,
      required: true,
    },
    enableMerchantsOfTheSeas: {
      type: Boolean,
      required: true,
    },
  },
})

module.exports = mongoose.model('Group', group)

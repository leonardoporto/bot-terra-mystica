class Message {
  constructor(gameData) {
    this.gameData = gameData
    this.sentences = []
  }

  static create(gameData) {
    return new Message(gameData)
  }

  build() {
    return this.sentences.join('\n')
  }

  playersFactions() {
    const players = Object.keys(this.gameData.players).reduce((response, key) => {
      const player = this.gameData.players[key]
      response.push(player ? `Player: ${player.nickname} => ${player.faction} and homeland ${player.homeland}` : '')
      return response
    }, []).filter((item) => item)
    this.sentences = this.sentences.concat(players)
    return this
  }

  world() {
    this.sentences.push(`Map: ${this.gameData.world}`)
    return this
  }
}

module.exports = Message

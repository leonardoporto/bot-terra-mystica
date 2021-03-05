
const { random } = require('../helpers/fixtures.helper')

class Game {

    constructor() {
        this.data = require('../../data/terra-mystica.json')
        this.colors = Object.keys(this.data)
    }

    allRandom(players) {
        return players.map((player) => {
            const color = this._getColor()
            return {
                player,
                color,
                race: this._pickRace(color)
            }
        })
    }

    banColor(color) {
        if (this.colors.indexOf(color) >= 0) {
            this.colors.splice(this.colors.indexOf(color), 1);
            return true
        }
        return false
    }

    banRace(race) {
        let response = false
        this.colors.forEach(color => {
            if (this.data[color].indexOf(race) >= 0) {
                response = true
                this.data[color].splice(this.data[color].indexOf(race), 1)
                if (this.data[color].length == 0) {
                    this.banColor(color)
                }
            }
        })
        return response
    }

    _getColor() {
        const color = this.colors[random(this.colors.length)]
        this.colors.splice(this.colors.indexOf(color), 1);
        return color
    }

    _pickRace(color) {
        return this.data[color][random(this.data[color].length)]
    }
}


module.exports = Game
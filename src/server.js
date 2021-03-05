require("dotenv").config();

const TelegramBot = require('node-telegram-bot-api');

const Game = require('./controllers/game.controller');

// replace the value below with the Telegram token you receive from @BotFather
const { TELEGRAM_BOT_TOKEN } = process.env;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Matches "/echo player1,player2,player3 ar,bc,bc"
bot.onText(/\/start (.+) (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const players = match[1].split(',');
    const config = match[2].split(',');

    const game = new Game()

    const options = {
        'ar': () => { console.log('All Random') },
        'bc': () => { console.log('Ban Color') },
        'br': () => { console.log('Ban Race') },
    }

    const response = game.allRandom(players)

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, response.reduce((response, p) => {
        console.log(p)
        response.push(`Player: ${p.player} => ${p.race}`)
        return response
    }, []).join('\n'));
});



// const game = new Game()
// console.log(game.allRandom(['Laercio', 'Leo', 'Milton', 'Rafael']));


// const game2 = new Game()

// console.log('Ban yellow', game2.banColor('yellow'));
// console.log('Ban blue', game2.banColor('blue'));
// console.log('Ban gray', game2.banColor('gray'));
// console.log('Ban black', game2.banColor('black'));
// console.log('Ban black', game2.banColor('black'));

// console.log(game2.allRandom(['Laercio', 'Leo', 'Milton', 'Rafael']));

// const game3 = new Game()

// console.log('Ban dragonlords', game3.banRace('dragonlords'));
// console.log('Ban yetis', game3.banRace('yetis'));
// console.log('Ban chaos magicians', game3.banRace('chaos magicians'));
// console.log('Ban giants', game3.banRace('giants'));

// console.log(game3.allRandom(['Laercio', 'Leo', 'Milton', 'Rafael']));
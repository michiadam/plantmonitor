require('dotenv').config()
const storage = require('node-persist');
const TelegramBot = require('node-telegram-bot-api');
const charter = require('./charter');



const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.post('/sensor', async (req, res) => {
    const data = req.body.sensordata;
    const name = req.body.name;
    var time = Date.now();


    let entries = await storage.getItem(entries);

    if (!entries) {
        entries = {}; 
    }
    
    entries.push({
        data, name, time
    })

    await storage.setItem("entries", entries);
    res.send('THX!')
})


const bot = new TelegramBot(process.env.TG_TOKEN, { polling: true });
(async () => {
    await app.listen(port);
    await storage.init({ dir: 'data' });
    let chats = await storage.getItem('chats');
    console.log(chats);
    if (!chats)
        chats = [];

    bot.onText(/\/start/, async (msg, match) => {
        await storage.setItem('name', 'yourname')
        const chatId = msg.chat.id;
        chats.push(chatId);

        storage.setItem("chats", chats);
        bot.sendMessage(chatId, "match");
    });
    bot.onText(/\/graph/, async (msg, match) => {
        const chatId = msg.chat.id;

        bot.sendPhoto(chatId, await charter.getChart(), {
            caption: "I'm a bot!"
        });
    });

})();


async function broadCast(chats, message) {
    chats.forEach(chat => {
        bot.sendMessage(chat, message);
    });
}
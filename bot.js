const express = require('express');
const mineflayer = require('mineflayer');

// Tiny web server so UptimeRobot can ping this app every 5 minutes
const app = express();
app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(process.env.PORT || 3000, () => console.log('Web ping server ready'));

function createBot() {
  const bot = mineflayer.createBot({
    host: 'shardzlobby.mcsh.gg', // Put your Lobby IP here
    port: 14475,            // Put your Lobby Port here
    username: 'LobbyKeeper',
    auth: 'offline',
    version: false
  });

  bot.on('spawn', () => {
    console.log('Bot joined the lobby!');
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
      bot.look(Math.random() * Math.PI * 2, 0);
    }, 30000);
  });

  bot.on('end', () => {
    console.log('Disconnected. Reconnecting in 10 seconds...');
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => console.log('Error:', err.message));
}

createBot();

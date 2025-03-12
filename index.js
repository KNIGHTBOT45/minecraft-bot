const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
const port = 3000;

// Function to create and start the bot
function createBot() {
  const bot = mineflayer.createBot({
    host: 'MinecraftPrivate.aternos.me', // Replace with your server IP
    port: 49038, // Replace with your server port
    username: '.Barroz', // Replace with your bot's username
    version: '1.21.4' // Replace with your server version
  });

  bot.on('login', () => {
    console.log('✅ Bot has joined the server!');
    keepAlive(bot);
    startAntiBanActions(bot);
  });

  bot.on('kicked', (reason) => {
    console.log(`❌ Bot was kicked: ${reason}`);
    setTimeout(() => {
      console.log('♻️ Reconnecting...');
      createBot(); // Recreate bot instance
    }, 5000);
  });

  bot.on('error', (err) => console.log(`❌ Error:`, err));
}

// Function to keep the bot active by chatting periodically
function keepAlive(bot) {
  setInterval(() => {
    bot.chat('NJAN BARROZ!! EE SERVER KAKUNNE BHOOTHAM!!');
  }, 300000); // Every 5 minutes
}

// Function to add human-like movement and prevent AFK kicks
function startAntiBanActions(bot) {
  // Random head movement
  setInterval(() => {
    const randomYaw = Math.random() * Math.PI * 2;
    const randomPitch = (Math.random() - 0.5) * Math.PI;
    bot.look(randomYaw, randomPitch, true);
  }, 5000); // Look around every 5 seconds

  // Random hotbar switching
  setInterval(() => {
    const hotbarSlot = Math.floor(Math.random() * 9);
    bot.setQuickBarSlot(hotbarSlot);
  }, 10000); // Switch hotbar every 10 seconds

  // Random movement to prevent AFK detection
  setInterval(() => {
    const moveForward = Math.random() > 0.3;
    const moveLeft = Math.random() > 0.5;
    const jump = Math.random() > 0.7;
    const sprint = Math.random() > 0.8;

    bot.setControlState('forward', moveForward);
    bot.setControlState('left', moveLeft);
    bot.setControlState('jump', jump);
    bot.setControlState('sprint', sprint);

    setTimeout(() => {
      bot.setControlState('forward', false);
      bot.setControlState('left', false);
      bot.setControlState('jump', false);
      bot.setControlState('sprint', false);
    }, Math.random() * 3000 + 2000); // Random movement between 2-5 seconds
  }, 10000); // Change movement every 10 seconds

  // Smart block digging (avoiding important structures)
  setInterval(() => {
    const block = bot.findBlock({
      matching: (block) => ['dirt', 'grass_block', 'log'].includes(block.name),
      maxDistance: 3 // Only dig nearby blocks
    });

    if (block && Math.random() > 0.7) { // 30% chance to dig
      bot.dig(block).catch(() => {}); // Ignore errors if digging fails
    }
  }, 20000); // Dig every 20 seconds
}

// Fake Express server to keep bot alive
app.get('/', (req, res) => {
  res.send('✅ Bot is running. NJAN BARROZ!!');
});

if (!module.parent) { // Prevent multiple instances
  app.listen(port, () => {
    console.log(`✅ Fake web server running on port ${port}`);
  });
}

});

// Start the bot for the first time
createBot();

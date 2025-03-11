const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'MinecraftPrivate.aternos.me', // Replace with your server IP
  port: 49038, // Your server port (default is 25565)
  username: '.Barroz', // Replace with your bot's username
  version: '1.21.4' // Replace with your server version
});

bot.on('login', () => {
  console.log('✅ Bot has joined the server!');
  keepAlive();
  startAntiBanActions();
});

bot.on('kicked', (reason) => {
  console.log(`❌ Bot was kicked: ${reason}`);
  setTimeout(() => bot.connect(), 5000);
});

bot.on('error', (err) => console.log(`❌ Error: `, err));

function keepAlive() {
  setInterval(() => {
    bot.chat('I am still alive!');
  }, 300000); // Every 5 minutes
}

function startAntiBanActions() {
  setInterval(() => {
    const randomYaw = Math.random() * Math.PI * 2;
    const randomPitch = (Math.random() - 0.5) * Math.PI;
    bot.look(randomYaw, randomPitch, true);
  }, 5000); // Randomly look around every 5 seconds

  setInterval(() => {
    const hotbarSlot = Math.floor(Math.random() * 9);
    bot.setQuickBarSlot(hotbarSlot);
  }, 10000); // Randomly switch hotbar every 10 seconds

  setInterval(() => {
    const forward = Math.random() > 0.5;
    const jump = Math.random() > 0.5;
    bot.setControlState('forward', forward);
    bot.setControlState('jump', jump);
    setTimeout(() => {
      bot.setControlState('forward', false);
      bot.setControlState('jump', false);
    }, 3000);
  }, 15000); // Randomly walk/jump around every 15 seconds

  setInterval(() => {
    const block = bot.blockAt(bot.entity.position.offset(0, -1, 0));
    if (block && Math.random() > 0.5) {
      bot.dig(block);
    }
  }, 20000); // Randomly dig blocks every 20 seconds
}

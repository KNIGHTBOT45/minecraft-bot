const mineflayer = require('mineflayer');
const keepAlive = require('./server');
const { Vec3 } = require('vec3'); // ✅ Fix the crash

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'MinecraftPrivate.aternos.me', // Replace with your Aternos IP
    port: 49038, // Default port
    username: '.GodFather', // Your bot's name
    version: '1.21.4' // Your Minecraft version
  });

  bot.on('spawn', () => {
    console.log('✅ Bot has joined the server!');
    bot.chat('I am here to keep the server online 24/7!');

    // ✅ Move around randomly to prevent being kicked
    setInterval(() => {
      const x = bot.entity.position.x + (Math.random() * 10 - 5);
      const z = bot.entity.position.z + (Math.random() * 10 - 5);
      const position = new Vec3(x, bot.entity.position.y, z);

      bot.setControlState('forward', true);
      bot.lookAt(position); // ✅ Fix crash (using Vec3)
    }, 10000); // Move every 10 seconds

    // ✅ Chat randomly to prevent AFK kick
    setInterval(() => {
      const messages = [
        'I am here to keep the server online!',
        '24/7 server online thanks to me!',
        'No shutdowns, no disconnections!',
        'Minecraft 24/7 bot active!',
        'Keeping the server alive 🔥!'
      ];
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      bot.chat(randomMessage);
    }, 60000); // Chat every 1 minute
  });

  bot.on('kicked', (reason) => {
    console.log('❌ Bot was kicked: ', reason);
    console.log('🔁 Waiting for server to start...');
    reconnect();
  });

  bot.on('error', (err) => {
    console.log('❌ Error: ', err);
    console.log('🔁 Waiting for server to start...');
    reconnect();
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected. Waiting for server to start...');
    reconnect();
  });

  function reconnect() {
    setTimeout(() => {
      console.log('🔁 Trying to reconnect to the server...');
      createBot();
    }, 60000); // ✅ Wait 1 minute before reconnecting
  }
}

keepAlive();
createBot();

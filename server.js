
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('✅ Bot is alive and running!');
});

app.listen(3000, () => {
  console.log('✅ Server is running!');
});

function keepAlive() {
  console.log('✅ Keep-alive function is running!');
}

module.exports = keepAlive;

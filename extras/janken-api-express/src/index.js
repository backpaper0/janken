const { hand } = require('./janken');
const enemyHand = require('./enemyHand');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/api/janken', (req, res) => {
  const player = hand[req.body.player];
  const enemy = enemyHand();
  const issue = player.jankenHoi(enemy);
  res.json({ player: player.name, enemy: enemy.name, issue });
});

app.listen(port, () => console.log(`janken-api-express listening on port ${port}!`));

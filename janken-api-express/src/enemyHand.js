const { hand } = require('./janken');
const hands = [hand.GU, hand.CHOKI, hand.PA];
const enemyHand = () => hands[Math.floor(Math.random() * hands.length)];
module.exports = enemyHand;

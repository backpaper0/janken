class Hand {
  constructor(name, value, addMe) {
    this.name = name;
    this.value = value;
    this.addMe = addMe;
  }

  jankenHoi(enemy) {
    const adjustedValue = a => (a + this.addMe) % 3;
    const p = adjustedValue(this.value);
    const e = adjustedValue(enemy.value);
    if (p == e) {
      return DRAW;
    } else if (p < e) {
      return WIN;
    }
    return LOSE;
  }
}

const GU = new Hand("GU", 0, 1);
const CHOKI = new Hand("CHOKI", 1, 0);
const PA = new Hand("PA", 2, 2);
const hand = { GU, CHOKI, PA };

const WIN = "WIN";
const DRAW = "DRAW";
const LOSE = "LOSE";
const issue = { WIN, DRAW, LOSE };

module.exports = { hand, issue };

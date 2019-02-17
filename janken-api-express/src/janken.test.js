const { hand: { GU, CHOKI, PA }, issue: { WIN, DRAW, LOSE } } = require("./janken");

const testCases = [
  [GU, GU, DRAW],
  [GU, CHOKI, WIN],
  [GU, PA, LOSE],
  [CHOKI, GU, LOSE],
  [CHOKI, CHOKI, DRAW],
  [CHOKI, PA, WIN],
  [PA, GU, WIN],
  [PA, CHOKI, LOSE],
  [PA, PA, DRAW]
];

testCases.forEach(([player, enemy, issue]) => {
  test(`${player.name} vs ${enemy.name} -> ${issue}`, () => {
    expect(player.jankenHoi(enemy)).toBe(issue);
  });
});

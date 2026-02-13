const calcTotal = require("../src/utils/calcTotal");

test("calcTotal calcule correctement le total", () => {
  const items = [
    { quantity: 2, unitPriceCents: 890 },
    { quantity: 1, unitPriceCents: 1290 },
  ];

  expect(calcTotal(items)).toBe(2 * 890 + 1 * 1290);
});

test("calcTotal renvoie 0 si items n'est pas un tableau", () => {
  expect(calcTotal(null)).toBe(0);
});

import { reduce } from "../src";

describe("Foldable", () => {
  test(String(reduce), () => {
    expect([[1], [2], [3]][reduce]((a, b: any) => a.concat(b), [])).toEqual([
      1,
      2,
      3
    ]);

    expect([1, 2, 3][reduce]((a, b) => Math.max(a, b), 1)).toBe(3);
  });
});

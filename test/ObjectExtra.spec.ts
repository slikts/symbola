import { of, to } from "../src";

describe("ObjectExtra", () => {
  test(String(of), () => {
    expect(Map[of]([1, 2])).toEqual(new Map([[1, 2]]));
    expect(Set[of](1)).toEqual(new Set([1]));
  });

  test(`${String(to)} Set`, () => {
    const s: Set<number> = [1, 2, 3][to](Set);
    expect(s).toEqual(new Set([1, 2, 3]));
  });

  test(`${String(to)} Map`, () => {
    const m: Map<number, number> = [[1, 2]][to](Map);
    expect(m).toEqual(new Map([[1, 2]]));
  });
});

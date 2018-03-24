import { of } from "../src";

describe("ObjectExtra", () => {
  test(String(of), () => {
    expect(Map[of]([1, 2])).toEqual(new Map([[1, 2]]));
    expect(Set[of](1)).toEqual(new Set([1]));
  });
});

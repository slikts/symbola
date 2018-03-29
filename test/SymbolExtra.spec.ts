import { to } from "../src/native/Object/IterableExtraOperations";
import { call } from "../src/native/SymbolExtra";
export * from "../src";

describe("SymbolExtra", () => {
  test(`${String(call)}, ${String(to)}`, () => {
    const s: Set<number> = to[call]([1, 2])(Set);
    expect(s).toEqual(new Set([1, 2]));
  });

  test(`${String(call)}, ${String(to)}`, () => {
    const it = [1, 2][Symbol.iterator]();
    const s: Set<number> = to[call](it)(Set);
    to[call](new Set([1, 2]));
    expect(s).toEqual(new Set([1, 2]));
  });
});

import OrdLaws from "./fantasy/OrdLaws";
import SetoidLaws from "./fantasy/SetoidLaws";
import SemigroupLaws from "./fantasy/SemigroupLaws";
import SemigroupoidLaws from "./fantasy/SemigroupoidLaws";
import FunctorLaws from "./fantasy/FunctorLaws";
import ChainLaws from "./fantasy/ChainLaws";
import ApplicativeLaws from "./fantasy/ApplicativeLaws";
import ApplyLaws from "./fantasy/ApplyLaws";
import "../src/util/log";

describe("Ord", () => {
  OrdLaws.test([
    [1, 2, 3],
    ["a", "b", "c"],
    ["a", "a", "a"],
    // [NaN, NaN, NaN],
    [[1], [2, 3], []],
    [[], [], []]
  ]);
});

describe("Setoid", () => {
  SetoidLaws.test([
    [1, 2, 3],
    ["a", "b", "c"],
    ["a", "a", "a"],
    [NaN, NaN, NaN],
    [[1], [2, 3], []],
    [[], [], []],
    [[1], [1], [1]]
  ]);
});

describe("Semigroup", () => {
  SemigroupLaws.test([
    ["a", "b", "c"],
    [[1], [2, 3], []],
    [[], [], []],
    [new Set([1]), new Set([2]), new Set([3, 4])]
  ]);
});

describe("Semigroupoid", () => {
  SemigroupoidLaws.test([
    [Math.sqrt, (a: number) => a + 1, (a: number) => a * 2, 4]
  ]);
});

describe("Functor", () => {
  FunctorLaws.test([
    [[1, 2], Math.sqrt, (a: number) => a + 1]
    // ["asd", (x: any) => `{${x}}`, (x: any) => `[${x}]`]
  ]);
});

describe("Chain", () => {
  const f = (x: any) => [x];
  const g = (x: any) => [1, x, 2];
  ChainLaws.test([[[0], f, g]]);
});

describe("Apply", () => {
  const v = [4, 9];
  const u = [Math.sqrt];
  const a = [(x: any) => x + 1];
  ApplyLaws.test([[v, u, a], [v, [Math.sqrt, Math.sqrt], a]]);
});
import { of } from "../src";
describe("Applicative", () => {
  test("identity", () => {
    ApplicativeLaws.identity([1], Array);
    ApplicativeLaws.identity([1, 3, 4], Set);
  });
});

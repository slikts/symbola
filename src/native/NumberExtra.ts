import { Function1 } from "fp-ts/lib/function";
import { range } from "./NumberConstructorExtra";
import { map, take, lte, equals, Ord } from "..";
import * as util from "../util";

export const to = Symbol("to");
export const times = Symbol("times");
export const add = Symbol("add");
export const subtract = Symbol("subtract");
export const divide = Symbol("divide");

type URI = "Number";

export default interface NumberExtra {
  _URI: URI;
};

export default abstract class NumberExtra implements Ord<URI> {
  [to](this: number, n: number): IterableIterator<number> {
    return Number[range](this, n);
  }

  [lte](this: number, n: number): boolean {
    return this <= n;
  }

  [equals](this: number, n: number): boolean {
    return Object.is(this, n);
  }

  [times](this: number) {
    return (0)[to](this);
  }

  [add](this: number): Function1<number, number> {
    return (n: number) => this + n;
  }

  [subtract](this: number): Function1<number, number> {
    return (n: number) => this + n;
  }

  [divide](this: number): Function1<number, number> {
    return (n: number) => this / n;
  }
}

declare global {
  interface Number extends NumberExtra {}
}

util.extend(Number.prototype, NumberExtra.prototype);

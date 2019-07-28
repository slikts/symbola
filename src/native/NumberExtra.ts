// import { Function1 } from "fp-ts/lib/function";
import { range } from "./NumberConstructorExtra";
import { map, take, lte, equals, Ord } from "..";
import * as util from "../util";

export const times = Symbol("times");
export const add = Symbol("add");
export const subtract = Symbol("subtract");
export const divide = Symbol("divide");

type URI = "Number";

export default interface NumberExtra {
  _URI: URI;
};

export default abstract class NumberExtra implements Ord<URI> {
  [lte](this: number, n: number): boolean {
    return this <= n;
  }

  [equals](this: number, n: number): boolean {
    return Object.is(this, n);
  }

  [times]<A>(this: number, f: (i: number) => A): A[] {
    return Array.from({ length: this }, (_, i) => f(i));
  }

  // TODO:
  // [add](this: number): Function1<number, number> {
  //   return (n: number) => this + n;
  // }

  // [subtract](this: number): Function1<number, number> {
  //   return (n: number) => this + n;
  // }

  // [divide](this: number): Function1<number, number> {
  //   return (n: number) => this / n;
  // }
}

declare global {
  interface Number extends NumberExtra {}
}

util.extend(Number.prototype, NumberExtra.prototype);

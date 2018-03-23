import { infinite } from "../util";

export const random = Symbol();

export default abstract class NumberConstructorExtra {
  static [random] = infinite(Math.random);
}

declare global {
  interface String {
    [random](n: number): IterableIterator<string>;
  }
}

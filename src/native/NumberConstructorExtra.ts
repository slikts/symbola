import { infinite } from "../util";

export const random = Symbol("random");
export const range = Symbol("range");

export default abstract class NumberConstructorExtra {
  *[range](a: number, b: number) {
    for (let i = 0; i < Math.abs(b - a) + 1; i += 1) {
      yield a + i * Math.sign(b - a);
    }
  }
}

declare global {
  interface NumberConstructor extends NumberConstructorExtra {}
}

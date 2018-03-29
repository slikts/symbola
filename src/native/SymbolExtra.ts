import * as util from "../util";
import "../util/log";

export const call = Symbol("call");

export default abstract class SymbolExtra {
  // XXX
  /*
  [call]<A extends keyof B, B extends { [P in A]: (...args: any[]) => any }>(
    this: A,
    b: B,
  ): B[A] {
    return x => b[this](x);
  }
  */
  [call](a: any) {
    return (x: any) => a[this](x);
  }
}

util.extend(Symbol.prototype, SymbolExtra.prototype);

declare global {
  interface Symbol extends SymbolExtra {}
}

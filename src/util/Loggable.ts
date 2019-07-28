export const log = Symbol("log");
export const logger = Symbol("logger");

export abstract class Loggable {
  // TODO:
  // [logger](...args: any[]): any;

  // [log]<A>(this: A, ...args: any[]): A {
  //   this[logger](...args, this);
  //   return this;
  // }
}

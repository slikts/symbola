// import { Function1 } from "fp-ts/lib/function";
import { compose, id, Category, Semigroupoid } from "..";
import { Predicate } from "../common";
import { extend } from "../util";

type URI = "Function";

export default interface FunctionFantasy<L, A> {
  _URI: URI;
  _L: L;
  _A: A;
};

export default abstract class FunctionFantasy<L, A> {
  // implements Semigroupoid<URI> {
  // TODO:
  // [compose]<I, J, K>(
  //   this: Function1<I, J>,
  //   f: Function1<J, K>
  // ): Function1<I, K> {
  //   return (i: I): K => f(this(i));
  // }
}

extend(Function.prototype, FunctionFantasy.prototype);

declare global {
  interface Function extends FunctionFantasy<never, never> {}
}

import { Semigroup } from "./Semigroup";

export const empty = Symbol("empty :: Monoid m => () -> m");

export interface Monoid extends Semigroup {
  // XXX
  [empty]<A>(this: Iterable<A>): Iterable<A>;
}

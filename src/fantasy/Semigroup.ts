import { HKT } from "fp-ts/lib/HKT";

export const concat = Symbol("concat :: Semigroup a => a ~> a -> a");

export interface Semigroup {
  // XXX
  [concat]<A>(this: Iterable<A>, a: Iterable<A>): Iterable<A>;
}

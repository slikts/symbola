import { HKT } from "fp-ts/lib/HKT";

export const reduce = Symbol(
  "reduce :: Foldable f => f a ~> ((b, a) -> b, b) -> b"
);

export interface Foldable<F> {
  [reduce]<A, B>(this: HKT<F, A>, f: (b: B, a: A) => B, b: B): B;
}

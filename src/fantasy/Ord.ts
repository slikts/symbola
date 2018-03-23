import { Setoid } from "./Setoid";
import { HKT } from "fp-ts/lib/HKT";

export const lte: unique symbol = Symbol("lte :: Ord a => a ~> a -> Boolean");

export interface Ord<F> extends Setoid<F> {
  [lte]<A>(this: HKT<F, A>, a: HKT<F, A>): boolean;
}

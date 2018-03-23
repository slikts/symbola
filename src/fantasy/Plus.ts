import { HKT } from "fp-ts/lib/HKT";
import { Alt } from "./Alt";

export const zero = Symbol("zero :: Plus f => () -> f a");

export interface Plus<F> extends Alt<F> {
  [zero]<A>(): HKT<F, A>;
}

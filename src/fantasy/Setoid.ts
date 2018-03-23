import { HKT } from "fp-ts/lib/HKT";
export const equals = Symbol("equals :: Setoid a => a ~> a -> Boolean");

export interface Setoid<F> {
  [equals]<A>(this: HKT<F, A>, a: HKT<F, A>): boolean;
}

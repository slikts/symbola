import { HKT } from "fp-ts/lib/HKT";
import { Functor } from "./Functor";

export const alt = Symbol("alt :: Alt f => f a ~> f a -> f a");

export interface Alt<F> extends Functor<F> {
  [alt]<A>(this: HKT<F, A>, a: HKT<F, A>): HKT<F, A>;
}

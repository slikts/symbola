import { HKT, HKT2, URIS2 } from "fp-ts/lib/HKT";
import { Apply } from "./Apply";

export const of: unique symbol = Symbol("of :: Applicative f => a -> f a");

export interface Applicative<F> {
  [of]<A>(a: A): HKT<F, A>;
}

export interface Applicative2<F> {
  [of]<L, A>(a: A): HKT2<F, L, A>;
}

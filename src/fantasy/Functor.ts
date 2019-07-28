import { HKT, URIS, URIS2 } from "fp-ts/lib/HKT";

export const map = Symbol("map :: Functor f => f a ~> (a -> b) -> f b");

export interface Functor<F> {
  [map]<A, B>(this: HKT<F, A>, f: (a: A) => B): HKT<F, B>;
}

// TODO: fp-ts
// export interface Functor2<F extends URIS2> {
//   [map]<L, A, B>(this: Type2<F, L, A>, f: (a: A) => B): HKT<F, B>;
// }

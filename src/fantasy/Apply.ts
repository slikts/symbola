import { HKT, URIS2 } from "fp-ts/lib/HKT";
import { Functor } from "./Functor";

export const ap = Symbol("ap :: Apply f => f a ~> f (a -> b) -> f b");

export interface Apply<F> extends Functor<F> {
  [ap]<A, B>(this: HKT<F, A>, fab: HKT<F, (a: A) => B>): HKT<F, B>;
}

// TODO: fp-ts
// export interface Apply2<F extends URIS2> extends Functor2<F> {
//   [ap]<L, A, B>(
//     this: Type2<F, L, A>,
//     f: Type2<F, L, (a: A) => B>
//   ): Type2<F, L, B>;
// }

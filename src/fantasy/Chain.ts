import { HKT } from "fp-ts/lib/HKT";
import { Apply } from "./Apply";

export const chain = Symbol("chain :: Chain m => m a ~> (a -> m b) -> m b");

export interface Chain<F> extends Apply<F> {
  [chain]<A, B>(f: (a: A) => HKT<F, B>): HKT<F, B>;
}

import { HKT } from "fp-ts/lib/HKT";
import { Chain } from "./Chain";

export const chainRec = Symbol(
  "chainRec :: ChainRec m => ((a -> c, b -> c, a) -> m c, a) -> m b"
);

export interface ChainRec<F> extends Chain<F> {
  [chainRec]<A, B, C>(
    f: (fac: (a: A) => C, fbc: (b: B) => C, a: A) => HKT<F, C>,
    a: A
  ): HKT<F, B>;
}

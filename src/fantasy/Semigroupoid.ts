import { HKT2 } from "fp-ts/lib/HKT";

export const compose = Symbol(
  "compose :: Semigroupoid c => c i j ~> c j k -> c i k"
);

export interface Semigroupoid<F> {
  [compose]<I, J, K>(f: HKT2<F, J, K>): HKT2<F, I, K>;
}

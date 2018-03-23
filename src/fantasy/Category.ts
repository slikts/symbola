import { HKT2 } from "fp-ts/lib/HKT";
import { Semigroupoid } from "./Semigroupoid";

export const id = Symbol("id :: Category c => () -> c a a");

export interface Category<F> extends Semigroupoid<F> {
  [id]: <A>() => HKT2<F, A, A>;
}

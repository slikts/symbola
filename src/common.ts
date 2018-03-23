import { HKT, HKT2 } from "fp-ts/lib/HKT";

export type Predicate<A> = (a: A) => boolean;
export type Predicate2<A, B> = (a: A, b: B) => boolean;

export type Tuple<A, B> = [A, B];

export type Entries<A, B> = Iterable<Tuple<A, B>>;

export interface Indexable<A> {
  [key: string]: A;
}

export interface Newable<A, B> {
  new (a: A): B;
}

/*
export interface Speciesable<A, B> {
  constructor: {
    [Symbol.species]: Newable<A, B>;
  };
}
*/

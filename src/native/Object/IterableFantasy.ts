import { HKT } from "fp-ts/lib/HKT";
import { Function1 } from "fp-ts/lib/function";
import { map, ap, chain, concat, reduce, empty, lte, equals } from "../..";
import { takeWhile } from "./IterableExtraOperations";
import { join } from "./IterableExtraOperations";
import { keepSpecies } from "../../util";
import * as util from "../../util";
import {
  Apply,
  Semigroupoid,
  Foldable,
  Monoid,
  Ord,
  Chain,
  Setoid,
} from "../..";

import URI from "./ObjectURI";

interface FantasyOperations<F>
  extends Apply<F>,
    Chain<F>,
    Monoid,
    Ord<F>,
    Setoid<F>,
    Foldable<F>,
    Setoid<F> {}

export default abstract class IterableFantasy
  implements FantasyOperations<URI> {
  @keepSpecies
  *[map]<A, B>(this: Iterable<A>, f: (a: A) => B): IterableIterator<B> {
    for (const x of this) {
      yield f(x);
    }
  }

  @keepSpecies
  [chain]<A, B>(
    this: Iterable<A>,
    f: (a: A) => Iterable<B>,
  ): IterableIterator<B> {
    return this[map](f)[join]();
  }

  @keepSpecies
  [ap]<A, B>(
    this: Iterable<A>,
    fab: Iterable<(a: A) => B>,
  ): IterableIterator<B> {
    return fab[chain](f => this[map](f));
  }

  // @keepSpecies
  *[concat]<A>(this: Iterable<A>, a: Iterable<A>): Iterable<A> {
    // throw Error("asd");
    // yield 123;
    yield* this;
    yield* a;
  }

  [reduce]<A, B>(this: Iterable<A>, f: (b: B, a: A) => B, b: B): B {
    let r = b;
    for (const a of this) {
      r = f(r, a);
    }
    return r;
  }

  @keepSpecies
  [empty]<A>(this: Iterable<A>): Iterable<A> {
    return [];
  }

  [lte]<A>(this: Iterable<A>, a: Iterable<A>): boolean {
    const a1: Iterator<A> = this[Symbol.iterator]();
    const a2: Iterator<A> = a[Symbol.iterator]();
    for (const [r1, r2] of util.zip(a1, a2)) {
      if (!r1.done && r2.done) {
        return false;
      }
    }
    return true;
  }

  [equals]<A extends { [Symbol.iterator]?: IterableIterator<B> }, B>(
    this: A,
    a: A,
  ): boolean;
  [equals]<A extends Iterable<B>, B>(this: A, a: A): boolean {
    if (
      typeof this === "object" &&
      this[Symbol.iterator] &&
      a[Symbol.iterator]
    ) {
      const a1 = this[Symbol.iterator]();
      const a2 = a[Symbol.iterator]();
      for (const [r1, r2] of util.zip(a1, a2)) {
        if (r1.done && r2.done) {
          return true;
        }
        if (
          r1.done ||
          r2.done ||
          (r1.value && r2.value && !r1.value[equals](r2.value)) ||
          !Object.is(r1.value, r2.value)
        ) {
          return false;
        }
      }
      return true;
    }
    return Object.is(this, a);
  }
}

util.extend(Object.prototype, IterableFantasy.prototype);

declare global {
  interface Object extends IterableFantasy {
    _URI: URI;
  }
}

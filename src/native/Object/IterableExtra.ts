import { HKT } from "fp-ts/lib/HKT";
// import { Function1 } from "fp-ts/lib/function";
import { Predicate, Predicate2, Entries, Newable } from "../../common";
import { keepSpecies, updateMap } from "../../util";
import * as util from "../../util";
import URI from "./ObjectURI";
import {
  join,
  take,
  takeWhile,
  filter,
  zip,
  pipe,
  size,
  groupBy,
  append,
  forEach,
  reverse,
  all,
  some,
} from "./IterableExtraOperations";
import { map, reduce, concat } from "../..";

export default abstract class IterableExtra {
  @keepSpecies
  *[join]<A>(this: Iterable<Iterable<A>>): IterableIterator<A> {
    for (const a of this) {
      yield* a;
    }
  }

  @keepSpecies
  *[take]<A>(this: Iterable<A>, n: number): IterableIterator<A> {
    let i = 0;
    for (const a of this) {
      if (i === n) {
        break;
      }
      yield a;
      i += 1;
    }
  }

  @keepSpecies
  *[takeWhile]<A>(this: Iterable<A>, f: Predicate<A>): IterableIterator<A> {
    for (const a of this) {
      if (!f(a)) {
        break;
      }
      yield a;
    }
  }

  @keepSpecies
  *[filter]<A>(this: Iterable<A>, f: Predicate<A>): IterableIterator<A> {
    for (const a of this) {
      if (f(a)) {
        yield a;
      }
    }
  }

  @keepSpecies
  *[zip]<A, B>(this: Iterable<A>, b: Iterable<B>): IterableIterator<[A, B]> {
    const ai = this[Symbol.iterator]();
    const bi = b[Symbol.iterator]();
    while (true) {
      const an = ai.next();
      const bn = bi.next();
      if (an.done || bn.done) {
        return;
      }
      yield [an.value, bn.value];
    }
  }

  // [pipe]<A, B, C>(this: [Function1<A, B>, Function1<B, C>]): (a: A) => C {
  // [pipe]<A, B, C, D>(
  //   this: [Function1<A, B>, Function1<B, C>, Function1<C, D>]
  // ): (a: A) => D;
  // [pipe]<A, B, C, D, E>(
  //   this: [Function1<A, B>, Function1<B, C>, Function1<C, D>, Function1<D, E>]
  // ): (a: A) => E {
  [pipe]<A, C>(this: any[]): (a: A) => C {
    return (a: any) => {
      let y = a;
      for (const x of this) {
        y = x.call(this, y);
      }
      return y;
    };
  }

  [size](this: Iterable<any>): number {
    if (Array.isArray(this)) {
      return this.length;
    }
    return Array.from(this).length;
  }

  // [groupBy]<K, V>(this: Iterable<V>, f: (v: V) => K): Entries<K, V> {
  //   return this[map]((v: V) => [f(v), v] as [K, V]);
  // }

  [groupBy]<K, A>(this: Iterable<A>, f: (a: A) => K): Map<K, Iterable<A>> {
    return this[reduce](
      (m, a) => updateMap(m, f(a), (as: Iterable<A>) => as[append](a), []),
      new Map(),
    );
  }

  @keepSpecies
  *[append]<A>(this: Iterable<A>, a: A) {
    yield* this;
    yield a;
  }

  [forEach]<A>(this: Iterable<A>, f: (a: A) => void): Iterable<A> {
    for (const a of this) {
      f(a);
    }
    return this;
  }

  @keepSpecies
  [reverse]<A>(this: Iterable<A>): Iterable<A> {
    return [...this].reverse();
  }

  [all]<A>(this: Iterable<A>, f: Predicate<A>): boolean {
    for (const a of this) {
      if (!f(a)) {
        return false;
      }
    }
    return true;
  }

  [some]<A>(this: Iterable<A>, f: Predicate<A>): boolean {
    return !this[all](a => !f(a));
  }
}

util.extend(Object.prototype, IterableExtra.prototype);

declare global {
  interface Object extends IterableExtra {}
}

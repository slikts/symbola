/*
import { HKT } from "fp-ts/lib/HKT";
import { Function1 } from "fp-ts/lib/function";
import { map, ap, chain, concat, reduce, empty, lte } from "../..";
import FantasyOperations from "./FantasyOperations";
import { join } from "./ExtraOperations";
import { keepSpecies } from "../../util";

import URI from "./ObjectURI";

export default interface AsyncIterableFantasy<A> {
  _URI: URI;
  _A: A;
};

export default abstract class AsyncIterableFantasy<A> {
  //implements FantasyOperations<URI> {
  @keepSpecies
  async *[map]<A, B>(
    this: AsyncIterable<A>,
    f: (a: A) => B
  ): AsyncIterableIterator<B> {
    for await (const x of this) {
      yield f(x);
    }
  }

  // @keepSpecies
  // [chain]<A, B>(
  //   this: AsyncIterable<A>,
  //   f: (a: A) => AsyncIterable<B>
  // ): AsyncIterableIterator<B> {
  //   return this[map](f)[join]();
  // }

  // @keepSpecies
  // [ap]<A, B>(
  //   this: AsyncIterable<A>,
  //   fab: AsyncIterable<(a: A) => B>
  // ): AsyncIterableIterator<B> {
  //   return fab[chain](f => this[map](f));
  // }

  @keepSpecies
  async *[concat]<A>(
    this: AsyncIterable<A>,
    a: AsyncIterable<A>
  ): AsyncIterableIterator<A> {
    yield* this;
    yield* a;
  }

  @keepSpecies
  async [reduce]<A, B>(
    this: AsyncIterable<A>,
    f: (b: B, a: A) => B,
    b: B
  ): Promise<B> {
    let r = b;
    for await (const a of this) {
      r = f(r, a);
    }
    return r;
  }

  @keepSpecies
  async *[empty]<A>(this: AsyncIterable<A>): AsyncIterable<A> {}

  async [lte]<A>(
    this: AsyncIterable<A>,
    a: AsyncIterable<A>
  ): Promise<boolean> {
    const a1 = this[Symbol.asyncIterator]();
    const a2 = a[Symbol.asyncIterator]();
    while (true) {
      const [r1, r2] = await Promise.all([a1.next(), a2.next()]);
      if (r1.done) {
        return true;
      }
      if (r2.done) {
        return false;
      }
    }
  }
}
*/

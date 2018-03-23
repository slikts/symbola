/*
import { HKT } from "fp-ts/lib/HKT";
import { Function1 } from "fp-ts/lib/function";
import { Predicate } from "../../common";
import { keepSpecies } from "../../util";
import URI from "./ObjectURI";
import ExtraOperations, {
  join,
  take,
  takeWhile,
  filter,
  zip,
  pipe,
  size
} from "./ExtraOperations";

export default interface AsyncIterableExtra<A> {
  _URI: URI;
  _A: A;
};

export default abstract class AsyncIterableExtra<A> {
  //implements ExtraOperations<URI>
  @keepSpecies
  async *[join]<A>(
    this: AsyncIterable<AsyncIterable<A>>
  ): AsyncIterableIterator<A> {
    for await (const a of this) {
      yield* a;
    }
  }

  @keepSpecies
  async *[take]<A>(
    this: AsyncIterable<A>,
    n: number
  ): AsyncIterableIterator<A> {
    let i = 0;
    for await (const a of this) {
      if (i === n) {
        break;
      }
      yield a;
      i += 1;
    }
  }

  @keepSpecies
  async *[takeWhile]<A>(
    this: AsyncIterable<A>,
    f: Predicate<A>
  ): AsyncIterableIterator<A> {
    for await (const a of this) {
      if (!f(a)) {
        break;
      }
      yield a;
    }
  }

  @keepSpecies
  async *[filter]<A>(
    this: AsyncIterable<A>,
    f: Predicate<A>
  ): AsyncIterableIterator<A> {
    for await (const a of this) {
      if (f(a)) {
        yield a;
      }
    }
  }

  @keepSpecies
  async *[zip]<A, B>(
    this: AsyncIterable<A>,
    b: AsyncIterable<B>
  ): AsyncIterableIterator<[A, B]> {
    const ai = this[Symbol.asyncIterator]();
    const bi = b[Symbol.asyncIterator]();
    while (true) {
      const [an, bn] = await Promise.all([ai.next(), bi.next()]);
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

  async [size](this: AsyncIterable<any>): Promise<number> {
    let r = 0;
    for await (const a of this) {
      r += 1;
    }
    return r;
  }
}
*/

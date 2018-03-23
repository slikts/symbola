import { map, chain, Chain, Functor, ap } from "..";
import * as util from "../util";

type URI = "Promise";

export default interface PromiseExtra<A> {
  _URI: URI;
  _A: A;
};

export default abstract class PromiseExtra<A>
  implements Functor<URI>, Chain<URI> {
  async [map]<A, B>(this: Promise<A>, f: (a: A) => B): Promise<B> {
    return f(await this);
  }

  async [chain]<A, B>(this: Promise<A>, f: (a: A) => Promise<B>): Promise<B> {
    return this[map](f);
  }

  async [ap]<A, B>(this: Promise<A>, fab: Promise<(a: A) => B>): Promise<B> {
    return (await fab)(await this);
  }
}

util.extend(Promise.prototype, PromiseExtra.prototype);

declare global {
  interface Promise<T> extends PromiseExtra<T> {}
}

import { HKT } from "fp-ts/lib/HKT";
import { AsyncQueue } from "@slikts/asyncqueue";
import { Newable } from "../../common";
import * as util from "../../util";
import URI from "./ObjectURI";
import { from, to, of } from "./IterableExtraOperations";

export const is = Symbol("is");

interface Listenable extends EventTarget  {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, ...rest: any[]): void;
}

export default abstract class ObjectExtra {
  [is](x: Newable<any, object>): boolean {
    return this instanceof x;
  }

  [from]<A>(
    this: Newable<Iterable<A>, Iterable<A>>,
    a: Iterable<A>,
  ): Iterable<A> {
    return new this(a);
  }

  [to]<A, B>(this: A, b: Newable<A, B>): B {
    return new b(this);
  }

  [of]<A>(this: EventTarget, type: string): AsyncIterableIterator<A> {
    const queue = new AsyncQueue<A>()
    this.addEventListener(type, event => queue.push(event))
    return queue[Symbol.asyncIterator]()
  }
}

util.extend(Object.prototype, ObjectExtra.prototype);

declare global {
  interface Object extends ObjectExtra {
    _URI: URI;
    // XXX
    _A: any;
  }

  interface MapConstructor {
    [from]<L, A>(as: Iterable<[L, A]>): Map<L, A>;
  }

  interface SetConstructor {
    [from]<A>(as: Iterable<A>): Set<A>;
  }
}

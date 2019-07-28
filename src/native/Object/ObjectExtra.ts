import { HKT } from "fp-ts/lib/HKT";
import { LastResult } from "queueable";
import { Newable } from "../../common";
import * as util from "../../util";
import URI from "./ObjectURI";
import { from, to } from "./IterableExtraOperations";

export const is = Symbol("is");

interface Listenable extends EventTarget  {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, ...rest: any[]): void;
}

const isEventTarget = (x: any): x is EventTarget => x && x.addEventListener && x.removeEventListener
const isEventEmitter = (x: any): x is EventTarget => x && x.addEventListener && x.removeEventListener

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

  // TODO:
  // [of]<A, B>(this: EventTarget | NodeJS.EventEmitter, type: A): AsyncIterableIterator<B> {
  //   if (isEventTarget(this)) {
  //     return LastResult.fromDom(type, this)
  //   }
  //   if (isEventEmitter(this)) {
  //     return LastResult.fromEmitter(type, this);
  //   }
  // }
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

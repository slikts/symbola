import * as fp from "fp-ts/lib/function";
import {
  Function1,
  Function2,
  Function3,
  Function4,
  Function5,
  Function6,
  Function7,
  Function8,
  Function9,
  Curried2,
  Curried3,
  Curried4,
  Curried5,
  Curried6,
  Curried7,
  Curried8,
  Curried9
} from "fp-ts/lib/function";
import { Predicate } from "../common";

export const complement = Symbol("complement");
export const once = Symbol("once :: (a... -> b) ~> (a... -> b)");
export const unary = Symbol("unary :: (a... -> b) ~> (a -> b)");
export const binary = Symbol("binary :: (a, b... -> c) ~> (a, b -> c)");
export const flip = Symbol("flip :: (a, b, c...) ~> (b, a, c...) ");
export const curry = Symbol("curry");

export default abstract class FunctionExtra {
  [complement]<A>(this: Predicate<A>, a: A): boolean {
    return !this(a);
  }

  [unary]<A, B>(this: (a: A, ...args: never[]) => B): (a: A) => B {
    return (a: A): B => this(a);
  }

  [binary]<A, B, C>(
    this: (a: A, b: B, ...args: never[]) => C
  ): (a: A, b: B) => C {
    return (a: A, b: B): C => this(a, b);
  }

  [flip]<A, B, C>(
    this: (a: A, b: B, ...args: any[]) => C
  ): (b: B, a: A, ...args: any[]) => C {
    return (b: B, a: A, ...args: any[]) => this(a, b, ...args);
  }

  [once]<A extends Function>(this: A): A {
    let first = true;
    let r: any;
    return (((...args: any[]) => {
      if (first) {
        first = false;
        r = this(...args);
      }
      return r;
    }) as any) as A;
  }

  [curry]<A, B, C>(this: Function2<A, B, C>): Curried2<A, B, C>;
  [curry]<A, B, C, D>(this: Function3<A, B, C, D>): Curried3<A, B, C, D>;
  [curry]<A, B, C, D, E>(
    this: Function4<A, B, C, D, E>
  ): Curried4<A, B, C, D, E>;
  [curry]<A, B, C, D, E, F>(
    this: Function5<A, B, C, D, E, F>
  ): Curried5<A, B, C, D, E, F>;
  [curry]<A, B, C, D, E, F, G>(
    this: Function6<A, B, C, D, E, F, G>
  ): Curried6<A, B, C, D, E, F, G>;
  [curry]<A, B, C, D, E, F, G, H, I>(
    this: Function7<A, B, C, D, E, F, G, H>
  ): Curried7<A, B, C, D, E, F, G, H>;
  [curry]<A, B, C, D, E, F, G, H, I>(
    this: Function8<A, B, C, D, E, F, G, H, I>
  ): Curried8<A, B, C, D, E, F, G, H, I>;
  [curry]<A, B, C, D, E, F, G, H, I, J>(
    this: Function9<A, B, C, D, E, F, G, H, I, J>
  ): Curried9<A, B, C, D, E, F, G, H, I, J> {
    return fp.curry(this);
  }
}

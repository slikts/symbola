import { Function1 } from "fp-ts/lib/function";
import { range } from "./NumberConstructorExtra";
import { map, take, lte, equals, Ord } from "..";
import * as util from "../util";

type URI = "String";

export default interface StringExtra {
  _URI: URI;
};

export default abstract class StringExtra implements Ord<URI> {
  [lte]<A extends string>(this: A, a: A): boolean {
    return this <= a;
  }

  [equals]<A extends string>(this: A, a: A): boolean {
    return this === a;
  }
}

util.extend(String.prototype, StringExtra.prototype);

declare global {
  interface String extends StringExtra {}
}

import { of, Applicative } from "..";
import { Newable } from "../common";
import * as util from "../util";
import { URI } from "./ArrayExtra";

export default abstract class ArrayConstructorExtra
  implements Applicative<URI> {
  [of]<A>(this: ArrayConstructor, a: A): Array<A> {
    return Array.from([a]);
  }
}

util.extend(Array, ArrayConstructorExtra.prototype);

declare global {
  interface ArrayConstructor extends ArrayConstructorExtra {}
}

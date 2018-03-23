// import { } from "..";
import * as util from "../util";

const call = Symbol("call");

export default abstract class SymbolExtra {
  [call](this: symbol) {}
}

util.extend(Symbol.prototype, SymbolExtra.prototype);

declare global {
  interface Symbol extends SymbolExtra {}
}

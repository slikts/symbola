export * from "./fantasy/Apply";
export * from "./fantasy/Chain";
export * from "./fantasy/Functor";
export * from "./fantasy/ChainRec";
export * from "./fantasy/Semigroup";
export * from "./fantasy/Setoid";
export * from "./fantasy/Ord";
export * from "./fantasy/Semigroupoid";
export * from "./fantasy/Category";
export * from "./fantasy/Foldable";
export * from "./fantasy/Applicative";
export * from "./fantasy/Plus";
export * from "./fantasy/Alt";
export * from "./fantasy/Monoid";

export * from "./native/FunctionExtra";
export * from "./native/FunctionFantasy";
export * from "./native/StringExtra";
export * from "./native/PromiseExtra";
export * from "./native/NumberConstructorExtra";
export * from "./native/NumberExtra";
export * from "./native/ArrayConstructorExtra";
export * from "./native/ArrayExtra";
export * from "./native/MapConstructorExtra";
export * from "./native/SymbolExtra";

export * from "./Object";

/*
declare global {
  interface Array<T> {
    constructor: ArrayConstructor;
  }

  interface Map<K, V> {
    constructor: MapConstructor;
  }
}
*/

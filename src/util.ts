import { Indexable, Newable, Predicate2 } from "./common";

export const setSymbolProperty = (target: object, symbol: symbol, value: any) =>
  Object.defineProperty(target, symbol, {
    value,
    writable: false,
    enumerable: false
  });

export const extend = (target: object, ...sources: any[]): void => {
  sources
    .map(x =>
      Object.getOwnPropertySymbols(x).map(symbol => ({
        symbol,
        method: x[symbol]
      }))
    )
    .reduce((a, b) => a.concat(b))
    .forEach(({ symbol, method }) => setSymbolProperty(target, symbol, method));
};

export const makeSpeciesWrapper = (name: string | symbol, f: Function) =>
  ({
    [name](this: any, ...args: any[]) {
      const result = f.apply(this, args);
      if (Array.isArray(this)) {
        return [...result];
      }
      const species = getSpecies(this);
      if (species) {
        return new species(result);
      }
      return result;
    }
  }[name as any]);

export const keepSpecies = (
  _: any,
  key: symbol,
  descriptor: PropertyDescriptor
) => {
  const name = `wrapped ${key.toString()}`;
  descriptor.value = makeSpeciesWrapper(name, descriptor.value);
};

export const getSpecies = (a: any): any | undefined =>
  a && a.constructor && a.constructor[Symbol.species];

export const infinite = function*<A>(f: () => A): IterableIterator<A> {
  while (true) {
    yield f();
  }
};

export const unary = <A, B>(
  f: (a: A, ...args: never[]) => B
): ((a: A) => B) => (a: A) => f(a);

export const binary = <A, B, C>(
  f: (a: A, b: B, ...args: never[]) => C
): ((a: A, b: B) => C) => (a: A, b: B): C => f(a, b);

export const mapObject = <A, B>(
  oa: Indexable<A>,
  f: (kv: [string, A]) => [string, B]
): Indexable<B> =>
  Object.entries(oa)
    .map(f)
    .reduce((a, [k, v]) => ({ ...a, [k]: v }), {});

export const id = <A>(a: A): A => a;

export const makeRange = (a: number, b: number): number[] =>
  Array.from(
    { length: Math.abs(b - a) + 1 },
    (_, i) => a + i * Math.sign(b - a)
  );

export const zip = function*<A, B>(a: Iterator<A>, b: Iterator<B>) {
  let done = false;
  while (!done) {
    const ra = a.next();
    const rb = b.next();
    done = ra.done || rb.done;
    if (done) {
      a.return && a.return();
      b.return && b.return();
    }
    yield [ra, rb];
  }
};

export const xor = <A>(a1: A, a2: A) => (!a1 && a2) || (a1 && !a2);

export const updateMap = <K, A>(
  m: Map<K, A>,
  k: K,
  f: (a: A) => A,
  init: A
): Map<K, A> => m.set(k, f((m.has(k) ? m.get(k) : init) as A));

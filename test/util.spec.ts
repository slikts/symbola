import {
  zip,
  extend,
  setSymbolProperty,
  keepSpecies,
  makeSpeciesWrapper,
  updateMap
} from "../src/util";
import "../src/util/log";

describe("symbol helpers", () => {
  test("setSymbolProperty", () => {
    const a: any = {};
    const s = Symbol();
    setSymbolProperty(a, s, 1);
    expect(a[s]).toBe(1);
  });

  test("extend one", () => {
    const a: any = {};
    const sa = Symbol();
    const sb = Symbol();
    extend(a, {
      [sa]: 1,
      [sb]: 2
    });
    expect(a[sa]).toBe(1);
    expect(a[sb]).toBe(2);
  });

  test("extend multiple", () => {
    const a: any = {};
    const sa = Symbol();
    const sb = Symbol();
    const sc = Symbol();
    const sd = Symbol();
    extend(
      a,
      {
        [sa]: 1,
        [sb]: 2
      },
      {
        [sc]: 3
      },
      {
        [sd]: 4
      }
    );
    expect(a[sa]).toBe(1);
    expect(a[sb]).toBe(2);
    expect(a[sc]).toBe(3);
    expect(a[sd]).toBe(4);
  });

  test("extend proto", () => {
    const sa = Symbol();
    const sb = Symbol();
    class A {}
    class B {
      [sa]() {
        return 1;
      }
      [sb]() {
        return 2;
      }
    }

    interface A extends B {}
    extend(A.prototype, B.prototype);
    expect(new A()[sa]()).toBe(1);
    expect(new A()[sb]()).toBe(2);
  });
});

describe("misc helpers", () => {
  test("zip equal", () => {
    const r = zip([1, 2][Symbol.iterator](), [1, 2][Symbol.iterator]());
    expect([...r]).toEqual([
      [{ done: false, value: 1 }, { done: false, value: 1 }],
      [{ done: false, value: 2 }, { done: false, value: 2 }],
      [{ done: true, value: undefined }, { done: true, value: undefined }]
    ]);
  });

  test("zip unequal", () => {
    const r = zip([1, 2][Symbol.iterator](), [1][Symbol.iterator]());
    expect([...r]).toEqual([
      [{ done: false, value: 1 }, { done: false, value: 1 }],
      [{ done: false, value: 2 }, { done: true, value: undefined }]
    ]);
  });

  test("zip empty", () => {
    const r = zip([][Symbol.iterator](), [][Symbol.iterator]());
    expect([...r]).toEqual([
      [{ done: true, value: undefined }, { done: true, value: undefined }]
    ]);
  });
});

describe("species", () => {
  const gen = function*(a: any) {
    yield* a;
  };

  test("preserves Array", () => {
    const r = makeSpeciesWrapper("a", gen).call([], [123]);
    expect(r).toEqual([123]);
    expect(Array.isArray(r)).toBe(true);
  });

  test("preserves Iterable", () => {
    const r = makeSpeciesWrapper("a", gen).call(null, [1, 2, 3]);
    expect([...r]).toEqual([1, 2, 3]);
    expect(Array.isArray(r)).toBe(false);
  });

  test("preserves Set", () => {
    const r = makeSpeciesWrapper("a", gen).call(Set.prototype, [1, 2, 3]);
    expect(r).toEqual(new Set([1, 2, 3]));
  });

  test("preserves Map", () => {
    const r = makeSpeciesWrapper("a", gen).call(Map.prototype, [
      [1, 2],
      [3, 4]
    ]);
    expect(r).toEqual(new Map([[1, 2], [3, 4]]));
  });

  // test("preserves String", () => {
  //   const r = bla("a", gen).call(String.prototype, "abc");
  //   expect(r).toEqual("abc");
  // });

  test("decorates method", () => {
    const bar = Symbol("bar");
    class Foo {
      @keepSpecies
      *[bar]<A>(a: Iterable<A>) {
        yield* a[Symbol.iterator]() as any;
      }
    }
    const q = new Foo()[bar]([1, 2, 3]);
    [...q];
    expect([...new Foo()[bar]([1, 2, 3])]).toEqual([1, 2, 3]);
    expect(Foo.prototype[bar].call([], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  test("decorates generator method", () => {
    const bar = Symbol("bar");
    class Foo {
      @keepSpecies
      *[bar]<A>(a: Iterable<A>): Iterator<A> {
        yield* a[Symbol.iterator]() as any;
      }
    }
    [...[1, 2, 3][Symbol.iterator]()];
    expect([...(new Foo()[bar]([1, 2, 3]) as any)]).toEqual([1, 2, 3]);
    expect(Foo.prototype[bar].call([], [1, 2, 3])).toEqual([1, 2, 3]);
  });
});

describe("updateMap", () => {
  test("update", () => {
    const m = new Map();
    const k = {};
    updateMap(m, k, v => v.concat(2), [1]);
    expect(m).toEqual(new Map([[k, [1, 2]]]));
  });
});

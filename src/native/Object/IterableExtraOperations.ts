export const join = Symbol("join :: Chain m => m (m a) -⁠> m a");
// export const last = Symbol("last");
export const take = Symbol("take :: Iterable f => f a ~> Number -⁠> f a");
export const takeWhile = Symbol(
  "takeWhile :: Iterable f => f a -> (a -⁠> Boolean) -⁠> f a",
);
export const filter = Symbol(
  "filter :: Iterable f => f a ~> (a -⁠> Boolean) -⁠> f a",
);
export const zip = Symbol("zip :: Iterable f => f a ~> f b -> f (a b)");
export const pipe = Symbol(
  "pipe :: [(a -⁠> b), (b -⁠> c), ..., (m -⁠> n)] -⁠> a -⁠> n",
);
export const size = Symbol("size :: Iterable f => f ~> () -> Number");
export const all = Symbol("every/all");
export const some = Symbol("any/some");
export const aperture = Symbol("aperture");
// export const find = Symbol(
//   "find :: Iterable f => f a ~> (a -> Boolean) -> Maybe a",
// );
// export const findLast = Symbol("findLast");
// export const findIndex = Symbol("findIndex");
// export const findLastIndex = Symbol("findLastIndex");
export const forEach = Symbol("forEach");
export const groupBy = Symbol("groupBy");
export const has = Symbol("has/contains/includes");
export const reverse = Symbol("reverse");
export const scan = Symbol("scan");
export const slice = Symbol("slice");
export const sort = Symbol("sort");
export const transduce = Symbol("transduce");
export const update = Symbol("update");
export const without = Symbol("without");
export const xprod = Symbol("xprod");
export const groupWith = Symbol("groupWith");
export const append = Symbol("append");
export const from = Symbol("from");
export const to = Symbol("to");
// TODO:
// export const of = Symbol("of");

<h1 align="center"><img src="https://i.imgur.com/cD3H3kV.png" width="541" height="180" alt="Symbola"></h1>

A proof of concept and a working example of a relatively novel approach to extending the JavaScript language using metaprogramming with [ES2015 symbols][symbols]; futuristic JavaScript that's usable today and requires no non-standard syntax or compilation

[![Build Status][build status image]][build status url]
[![Dependencies][dependencies image]][dependencies url]
[![Dev Dependencies][dep status image]][dep status url]
[![NPM Version][npm version image]][npm version url]
[![License][license image]][license url]

symbol land is a functional utility library that extends the native JavaScript object prototypes using unique symbol properties to prevent name collisions. A major purpose of the library is to simplify iterating over and instantiating the JavaScript built-in data structures by removing the need for explicit conversions to and from arrays or the need to wrap the data values in helper functions creating nesting; instead, operations like iteration are available as prototypal function properties on the objects, enabling a more idiomatic and 'flat' JavaScript programing style.

The library adapts the [Fantasy Land] specification to symbol properties, hence the name symbol land.

## Work in progress

The library is usable but still in an early stage of development, so breaking changes are expected and major parts are not yet implemented; contributions and criticisms are welcome.

## Examples

### Instantiation/conversion

```js
import { toMap, toSet } from 'symbola';

{ a: 1, b: 2 }[toMap](); // -> Map { a: 1, b: 2 }
[1, 2, 3][toSet](); // -> Set { 1, 2, 3 }
```
The values of `toMap` and `toSet` are unique symbols that are used to look up the methods from the prototype chain of the objects.

The native approach for instantiating the same types is less terse (the import statement notwithstanding) and requires the `new` keyword, which limits composition, and requires nested parameters:
```js
new Map(Object.entries({ a: 1, b: 2 }));
new Set([1, 2, 3]);
```
The extra verbosity could be abstracted with helper functions like usually done by utility libraries, but the issue of parameter nesting creating pyramid-shaped code that's less readable than flat chains, as well as the annoyance of having to count and balance parenthesis, would remain. Chainable methods can be implemented for custom types, and the native types can be subtyped or wrapped to add custom methods, but extending the native objects with custom methods offers the best user convenience and interoperability.

The convenience of extending the native prototypes has been the motivating reason for different libraries to attempt it using string properties, and the resulting compatibility issues and the ongoing conflicts with the JavaScript standardization process have established a well-grounded prescription against native prototype extension; however, the introduction of unique symbols in ES2015 creates an as-yet-untapped safe method for 'imbuing' native objects with new behavior.

### Generic iteration

Like with `for-of` and `for-await-of` loops, any object implementing the [iteration protocols] can be iterated over:
```js
import { map, join } from "symbola";

[[1, 2], [3]][join](); // -> [1, 2, 3]
"abc"[map](x => x.toUpperCase()); // -> IterableIterator { "A", "B", "C" }
```
Note that iterating over a string returned a generic iterator, not a new string; this is because the type of iterable is preserved between operations only for 'speciesable' type constructors like `Map`, `Set` and `Array` that implement the [species protocol]:
```js
new Set([1, 2, 3])[map](x => x + 1); // -> Set { 1, 2, 3 }
```
The iteration works generically (is not bound to specific subtypes of `Object`) because the methods for generic iteration are defined at the root of the prototype chain on `Object.prototype`; however, naming conflicts with other libraries or user code for the methods are not possible, because the method names are [unique symbols][symbols]. To illustrate:
```js
import * as symbolLand from 'symbola';

const map = Symbol(); // make a new unique symbol
Object.prototype[map] = null; // the symbol land method is not overridden because the symbols are unique
[1, 2, 3][symbolLand.map](Math.sign); // -> [1, 1, 1]
``` 
Generic iterables include [generators] and `NodeList` objects:
```js
import { map, forEach } from "symbola";

const generator = function*() { yield 1; yield 2; yield 3; }
generator()[map](x => x + 1); // -> [2, 3, 4]

const nodeList = document.querySelectorAll('*'); // -> NodeList { ... }
nodeList[forEach](console.log); // logs every element in the document to the console
```
An important aspect of generic iterables is that they are **lazy** as opposed to eager; the iteration is only performed when the lazy iterator is 'consumed'. Lazy iteration is useful when dealing with very long or infinite iterables or when the operations are 'expensive' in some way.
```js
import { times } from "symbola";

Infinity[times](Math.random)[take](5); // returns five random numbers, despite the iterable being infinite
(5)[times](n => `http://example.com/?page=${n}`)[map](fetch); // returns a lazy iterable of fetch requests that can be started sequentially instead of all at once
```
The `times` method is also an example of other useful extensions to the language enabled by the approach of symbol land, in this case operating on numbers.

<!-- XXX add example of eager iteration -->

### Function composition

```js
import { compose } from "symbola";

Math.round[compose](Math.sqrt); // -> x => Math.round(Math.sqrt(x));
// XXX to be expanded
```

### Logging
```js
import { log } from "symbola/util/log";

[1, 2][log](); // logs [1, 2]
foo(bar()[log]('bar')); // logs ('bar', bar()) and returns the result of bar()
```
The ability to log non-null values by just calling a method instead of wrapping the value in a function call is a significant boon for log-based debugging.

### Construction
```js
import { of, from } from "symbola";

Set[from]([1, 2, 3]); // -> Set { 1, 2, 3 }
Set[of](1); // -> Set { 1 }
```
The `from` method works generically on all constructible types, making `new` calls more composable.

### TODO

More examples to be covered here are async iteration (converting event streams to async iterables to iterate over) and calling symbol methods with the receiver or `this` context as a regular parameter.

## Installation and usage
```
npm install --save symbola
# or
yarn add symbola
```
Importing the operators will set them up on the native prototypes:
```js
import { map } from "symbola";
```

## Functional programming

symbol land adapts the [Fantasy Land] monadic `chain` method to the `Promise` type, making the `Promise` type more like futures in functional programming, but compared to libraries like [Fluture], the extended `Promise` retains compatibility with the `async/await` syntax and every other `Promise`-based API.

symbol land attempts to be well-typed within the limitations of TypeScript; it uses the lightweight higher-kinded polymorphism approach from [fp-ts].

Integration with other Fantasy Land compliant libraries needs to be explored; symbol land is not Fantasy Land compliant but adapts it to using symbol properties, so compatibility with Fantasy Land for the native types is not possible, but it's possible for custom types to support both symbol land and Fantasy Land, and for Fantasy Land supporting code to be adapted to support symbol land.

## Limitations

`null` and `undefined` values do not have a prototype so attempting to call any method on these values will throw a `TypeError` exception; this is an area where a syntactical language extension like the pipeline operator would work better than metaprogramming with symbols. The solution for using methods with nullable values is wrapping them in 'option types' from the functional paradigm like `Maybe` or `Result`.

## Performance

The performance implications of extending native prototypes with symbol properties remain to be explored.

## Rationale for generic iteration

The popularity and preponderance within the JavaScript ecosystem of utility libraries like lodash, underscore, Ramda, Immutable.js, etc., that largely deal with iteration, reflects the need for improving the 'user story' for working with JavaScript data structures, but libraries have been limited to providing functionality with drawbacks compared to native language support, and the standardization process has somewhat stalled in the area after introducing many significant improvements like:

  * the static `Object.keys()` helper method and the `Array` iteration methods in ES5,
  * generators, `Map` and `Set` collection types, `for-of` loops and the iteration protocol in ES2015,
  * `Object.entries()` helper method in ES2017,
  * [async iteration protocol] and `for-await-of` loops in ES2018.
 
The [pipeline operator proposal] or the [bind operator proposal] would be steps towards first-class language support for custom operations on any types, but these proposals have also stalled due to the complexity of the problem.

There have been proposals to extend the prototypes of the `Map` and `Set` collection types, which currently only have a `forEach()` method, with similar iteration methods like on `Array` prototype, but extending just the specific prototypes would lack the advantages of generic iteration like avoiding duplication in the language spec and covering many more use cases.

`Array` prototype is slated to be extended with a `flatten()` method, but it has ran into a naming conflict with legacy libraries adding a `flatten()` property to `Array` prototype. In fact, naming conflicts with user code is why many of the `Array` iteration methods have relatively unusual names, because the standardization process is predicated on compatibility with all existing code.

## Licensing

symbol land is MIT licensed.

[iteration protocols]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
[symbols]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
[species protocol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/species
[fantasy land]: https://github.com/fantasyland/fantasy-land
[generators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
[pipeline operator proposal]: https://github.com/tc39/proposal-pipeline-operator
[bind operator proposal]: https://github.com/tc39/proposal-bind-operator
[async iteration protocol]: http://2ality.com/2016/10/asynchronous-iteration.html
[flatten]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatten
[Fluture]: https://github.com/fluture-js/Fluture
[fp-ts]: https://github.com/gcanti/fp-ts

[license url]: LICENSE
[license image]: https://img.shields.io/npm/l/symbola.svg
[npm version image]: https://img.shields.io/npm/v/symbola.svg
[npm version url]: https://www.npmjs.com/package/symbola
[build status url]: https://travis-ci.org/slikts/symbola
[build status image]: https://travis-ci.org/slikts/symbola.svg?branch=master
[dep status url]: https://david-dm.org/slikts/symbola#info=devDependencies
[dep status image]: https://david-dm.org/slikts/symbola/dev-status.svg
[dependencies image]: https://david-dm.org/symbola/symbola.svg
[dependencies url]: https://david-dm.org/symbola/symbola

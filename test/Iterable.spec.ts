import { groupBy, equals, groupWith, map, append } from "../src";
import "../src/util/log";

test(String(groupBy), () => {
  expect(
    [-5, -9, 0, 2, 44][groupBy](Math.sign)[map](([k, v]) => [k, [...v]])
  ).toEqual(new Map([[-1, [-5, -9]], [0, [0]], [1, [2, 44]]]));
});

test(String(groupWith), () => {
  // expect([1, 1, 2, 1, 1][groupWith]((a, b) => a[equals](b))).toEqual([
  //   [1, 1],
  //   [2],
  //   [1, 1]
  // ]);
});

test(String(append), () => {
  expect([1, 2][append](3)).toEqual([1, 2, 3]);
});

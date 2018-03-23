import { HKT2 } from "fp-ts/lib/HKT";
import { of, Applicative2 } from "..";
/*
type URI = "Map";

Map[of] = <K, V>(a: Iterable<[K, V]>): Map<K, V> => new Map(a);

declare global {
  interface MapConstructor extends Applicative2<URI> {
    [of]<K, V>(a: Iterable<[K, V]>): Map<K, V>;
  }
  interface Map<K, V> extends HKT2<URI, K, V> {}
}
*/

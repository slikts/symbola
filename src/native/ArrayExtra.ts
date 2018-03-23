export type URI = "Array";

declare global {
  interface Array<T> {
    _URI: URI;
    _A: T;
  }
}

import { equals, lte, Ord } from "../../src";
import Laws from "./Laws";

export default class OrdLaws<A extends Ord<any>> extends Laws {
  ab: boolean;
  ba: boolean;
  constructor(readonly params: A[]) {
    super(params);
    const [a, b] = params;
    this.ab = a[lte](b);
    this.ba = b[lte](a);
  }

  totality() {
    expect(this.ab || this.ba).toBe(true);
  }

  antisymmetry() {
    const [a, b] = this.params;
    if (this.ab && this.ba) {
      expect(a[equals](b)).toBe(true);
    }
  }

  transitivity() {
    const [a, b, c] = this.params;
    if (this.ab && b[lte](c)) {
      expect(a[lte](c)).toBe(true);
    }
  }
}

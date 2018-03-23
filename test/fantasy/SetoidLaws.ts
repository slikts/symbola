import { equals, Setoid } from "../../src";
import Laws from "./Laws";

export default class extends Laws {
  reflexivity() {
    const [a] = this.params;
    if (!a[equals](a)) {
      console.log(a);
    }
    expect(a[equals](a)).toBe(true);
  }

  symmetry() {
    const [a, b] = this.params;
    expect(a[equals](b)).toBe(b[equals](a));
  }

  transitivity() {
    const [a, b, c] = this.params;
    const ab = a[equals](b);
    const bc = b[equals](c);
    const ac = a[equals](c);
    if (ab && bc) {
      expect(ac).toBe(true);
    }
  }
}

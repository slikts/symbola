import { concat, Semigroup } from "../../src";
import Laws from "./Laws";

export default class extends Laws {
  associativity() {
    const [a, b, c] = this.params;
    expect(a[concat](b)[concat](c)).toEqual(a[concat](b[concat](c)));
  }
}

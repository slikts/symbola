import { compose, Semigroupoid } from "../../src";
import Laws from "./Laws";

export default class extends Laws {
  // TODO:
  // associativity() {
  //   const [a, b, c, d] = this.params;
  //   expect(a[compose](b)[compose](c)(d)).toEqual(a[compose](b[compose](c))(d));
  // }
}

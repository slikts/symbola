import { chain } from "../../src";
import Laws from "./Laws";

export default class extends Laws {
  associativity() {
    const [m, f, g] = this.params;
    expect(m[chain](f)[chain](g)).toEqual(m[chain]((x: any) => f(x)[chain](g)));
  }
}

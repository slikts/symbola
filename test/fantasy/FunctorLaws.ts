import { map, Functor } from "../../src";
import { id } from "../../src/util";
import Laws from "./Laws";

export default class extends Laws {
  identity() {
    const [u] = this.params;
    expect(u[map](id)).toEqual(u);
  }

  composition() {
    const [u, f, g] = this.params;
    expect(u[map]((x: any) => f(g(x)))).toEqual(u[map](g)[map](f));
  }
}

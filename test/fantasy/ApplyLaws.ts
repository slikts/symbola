import { map, ap, Apply } from "../../src";
import Laws from "./Laws";

export default class extends Laws {
  composition() {
    const [v, u, a] = this.params;
    expect(
      v[ap](u[ap](a[map]((f: any) => (g: any) => (x: any) => f(g(x)))))
    ).toEqual(v[ap](u)[ap](a));
  }
}

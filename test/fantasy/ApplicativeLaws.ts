import { ap, of, Applicative, Apply } from "../../src";
import { id } from "../../src/util";
import Laws from "./Laws";

export default class {
  static identity(v: Apply<any>, A: Applicative<any>) {
    const ai = A[of](id);
    expect(v[ap](ai)).toEqual(v);
  }

  /*
  static homomorphism(A: Applicative<any>, f: any, x: any) {
    const a = A[of](x)[ap](A[of](f));
    const b = A[of](f(x));
    expect(a).toEqual(b);
  }

  static interchange(A, y, u) {
    const a = A[of](y)[ap](u);
    const b = u[ap](A[of]((f: any) => f(y)));
    expect(a).toEqual(b);
  }
  */
}

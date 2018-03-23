export default class Laws {
  constructor(readonly params: any[]) {
    this.params = params;
  }

  static get names(): any[] {
    return Object.getOwnPropertyNames(this.prototype).filter(
      x => x !== "constructor"
    );
  }

  static test(data: any[]) {
    const laws = data.map(params => new this(params));
    this.names.forEach(name => {
      test(name, () => {
        laws.forEach((law: any) => {
          law[name]();
        });
      });
    });
  }
}

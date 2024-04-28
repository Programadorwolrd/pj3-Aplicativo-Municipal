export class InputValues<T> {
  private values = {} as T;

  public get getAll() {
    return this.values;
  }

  public get<K extends keyof T>(campo: K) {
    return this.values[campo];
  }

  public onChange<K extends keyof T>(campo: K) {
    return (v: T[K]) => {
      this.values[campo] = v;
    };
  }
}

export function getAllValues<T>() {
  const values = {} as T;

  return [
    values,
    (campo: keyof T) => {
      return (t: T[typeof campo]) => {
        values[campo] = t;
      };
    },
  ] as const;
}

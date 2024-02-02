export type CustomError<T> = {
  [Property in keyof T]: {
    _errors: string[];
  };
};

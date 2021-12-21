export const clientErrHandler = (value: string, name: string) => {
  const err = new Error(value);
  err.name = name;
  throw err;
};

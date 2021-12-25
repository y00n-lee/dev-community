export const clientErrHandler = (value: string, name: string) => {
  const err = new Error(value);
  err.name = name;
  return err;
};

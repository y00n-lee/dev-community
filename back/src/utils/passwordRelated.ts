import * as bcrypt from "bcrypt";

const BCRYPT_SALT = 10 as const;

export const makeHashPassword = async (password: string) =>
  await bcrypt.hash(password, BCRYPT_SALT);

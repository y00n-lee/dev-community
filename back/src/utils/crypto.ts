import { AES, enc } from "crypto-js";
import { secretContents } from "./constants";

export const encryptValue = (value: string) => AES.encrypt(value, secretContents.signin).toString();

export const decryptValue = (value: string) =>
  AES.decrypt(value, secretContents.signin).toString(enc.Utf8);

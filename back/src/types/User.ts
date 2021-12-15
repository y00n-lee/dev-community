import { Document } from "mongoose";

export interface ITokenUser {
  shortId: string;
  email: string;
  username: string;
  age: number;
  gender: string;
}

export interface IUserData extends ITokenUser {
  password: string;
}

export interface IUser extends IUserData, Document {
  refreshToken: string | null;

  hashPassword(userData: IUser): Promise<void>;
  comparePassword(aPassword: string): Promise<boolean>;
  verifyRefresh(): boolean;
}

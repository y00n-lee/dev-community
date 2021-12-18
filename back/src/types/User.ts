import { Document, Model } from "mongoose";

export interface ITokenUser {
  id: string;
}

export interface IUserData {
  email: string;
  password: string;
  nickname: string;
  age: number;
  gender: "male" | "female";
  tags: any[];
}

export interface IUserDocument extends IUserData, Document {
  refreshToken: string | null;
  emailVerified: boolean;
  keyForVerify: string;
  passwordReset: boolean;
  posts: any[];

  comparePassword(aPassword: string): Promise<boolean>;
  verifyRefresh(): boolean;
}

export interface IUserModel extends Model<IUserDocument> {
  hashPassword(userData: IUserData): Promise<void>;
}
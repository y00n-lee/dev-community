import { Document, Model, Types } from "mongoose";
import { IPost } from "./Post";

export interface ITokenUser {
  id: string;
  nickname: string;
}

export interface IUserData {
  email: string;
  password: string;
  nickname: string;
  birth: Date;
  gender: "male" | "female";
  tags: any[];
}

export interface IUserDocument extends IUserData, Document {
  refreshToken: string | null;
  emailVerified: boolean;
  keyForVerify: string;
  passwordReset: boolean;
  posts: Types.DocumentArray<IPost>;

  comparePassword(aPassword: string): Promise<boolean>;
  verifyRefresh(): boolean;
}

export interface IUserModel extends Model<IUserDocument> {
  hashPassword(userData: IUserData): Promise<void>;
}

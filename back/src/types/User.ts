import { Document, Model } from "mongoose";

export interface ITokenUser {
  id: string;
}

export interface IUserData {
  email: string;
  password: string;
  username: string;
  age: number;
  gender: "male" | "female";
  tags: any[];
}

export interface IUserDocument extends IUserData, Document {
  refreshToken: string | null;

  comparePassword(aPassword: string): Promise<boolean>;
  verifyRefresh(): boolean;
}

export interface IUserModel extends Model<IUserDocument> {
  hashPassword(userData: IUserData): Promise<void>;
}

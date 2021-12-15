import { Schema } from "mongoose";
import * as bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

import { jwtContents } from "@src/utils/constants";
import { IUserData, IUserDocument } from "@src/types/User";
import { IUserModel } from "@src/types/User";

const BCRYPT_SALT = 10 as const;

export const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// statics this가 모델을 가르킴
UserSchema.statics.hashPassword = async function (userData: IUserData) {
  if (!userData.password) return;
  userData.password = await bcrypt.hash(userData.password, BCRYPT_SALT);
};

// this가 생성된 인스턴트를 가르킴
UserSchema.methods.comparePassword = async function (aPassword: string) {
  console.log(aPassword);
  return await bcrypt.compare(aPassword, this.password);
};

UserSchema.methods.verifyRefresh = function () {
  if (!this.refreshToken) return false;
  const result = verify(this.refreshToken, jwtContents.secret);

  console.log("@@", this.refreshToken, result);
  return Boolean(result);
};

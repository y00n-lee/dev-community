import { Schema } from "mongoose";
import * as bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

import { jwtContents } from "@src/utils/constants";
import { IUserData, IUserDocument } from "@src/types/User";
import { IUserModel } from "@src/types/User";
import { makeHashPassword } from "@src/utils/passwordRelated";
import { TagSchema } from "./tag.model";
import { PostSchema } from "./post.model";

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
    nickname: {
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
    tags: [TagSchema],
    posts: [PostSchema],
    refreshToken: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      required: true,
    },
    keyForVerify: {
      type: String,
      required: true,
    },
    passwordReset: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.statics.hashPassword = async function (userData: IUserData) {
  if (!userData.password) return;
  userData.password = await makeHashPassword(userData.password);
};

UserSchema.methods.comparePassword = async function (aPassword: string) {
  return await bcrypt.compare(aPassword, this.password);
};

UserSchema.methods.verifyRefresh = function () {
  if (!this.refreshToken) return false;
  const result = verify(this.refreshToken, jwtContents.secret);

  return Boolean(result);
};

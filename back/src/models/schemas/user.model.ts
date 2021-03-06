import { Schema } from "mongoose";
import * as bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";

import { jwtContents } from "@utils/constants";
import { makeHashPassword } from "@utils/passwordRelated";

import { IUserData, IUserDocument } from "@src/types/User";
import { IUserModel } from "@src/types/User";

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
    birth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    github: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
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

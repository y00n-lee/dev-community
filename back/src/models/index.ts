import mongoose from "mongoose";
import { ITagDocument, ITagModel } from "@src/types/Tag";
import { IUserDocument, IUserModel } from "@src/types/User";

import { TagSchema } from "./schemas/tag.model";
import { UserSchema } from "./schemas/user.model";

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
const Tag = mongoose.model<ITagDocument, ITagModel>("Tag", TagSchema);

export { User, Tag };

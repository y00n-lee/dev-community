import mongoose from "mongoose";
import { ITagModel } from "@src/types/Tag";
import { IUserDocument, IUserModel } from "@src/types/User";
import { IReply } from "@src/types/Reply";
import { IPost, PostModel } from "@src/types/Post";

import { TagSchema } from "./schemas/tag.model";
import { UserSchema } from "./schemas/user.model";
import { ReplySchema } from "./schemas/reply.model";
import { PostSchema } from "./schemas/post.model";

const User = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
const Tag = mongoose.model<ITagModel>("Tag", TagSchema);
const Reply = mongoose.model<IReply>("Reply", ReplySchema);
const Post = mongoose.model<IPost, PostModel>("Post", PostSchema);

export { User, Tag, Reply, Post };

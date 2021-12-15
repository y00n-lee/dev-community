import { IReply } from "./Reply";
import { IUserDocument } from "./User";
import { Model, Types, PopulatedDoc } from "mongoose";

export interface IPost {
  title: string;
  author: PopulatedDoc<IUserDocument>;
  views: number;
  replies: Types.DocumentArray<IReply>;
  RegisterDate: Date;
  modifiyDate: Date;
  isEdit: boolean;
}

export interface PostModel extends Model<IPost> {
  getPaginatedPosts(query: object, page: number, perPage: number): Promise<number[]>;
}

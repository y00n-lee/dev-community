import { IComment } from "./Comment";
import { IUserDocument } from "./User";
import { Model, Types, PopulatedDoc } from "mongoose";

export interface IPost {
  title: string;
  author: PopulatedDoc<IUserDocument>;
  views: number;
  comments: Types.DocumentArray<IComment>;
  isEdit: boolean;
}

export interface IPostModel extends Model<IPost> {
  getPaginatedPosts(query: object, page: number, perPage: number): Promise<number[]>;
}

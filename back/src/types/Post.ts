import { IComment } from "./Comment";
import { IUserDocument } from "./User";
import { ITagDocument } from "./Tag";
import { Model, Types, PopulatedDoc } from "mongoose";

export interface IPost {
  title: string;
  author: PopulatedDoc<IUserDocument>;
  content: string;
  views: number;
  comments: Types.DocumentArray<IComment>;
  members: Types.DocumentArray<IUserDocument>;
  tags: Types.DocumentArray<ITagDocument>;
  isEdit: boolean;
  time: Date | null;
}

export interface IPostModel extends Model<IPost> {
  getPaginatedPosts(query: object, page: number, perPage: number): Promise<number[]>;
}

export interface PostDTO {
  postId?: string;
  title: string;
  content: string;
  userId: string;
  tagList: string[];
  time?: Date;
}

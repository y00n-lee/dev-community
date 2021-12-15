import { IComment } from "./Comment";
import { IUser } from "./User";
import { Types, Document, PopulatedDoc } from "mongoose";

export interface IPost extends Document {
  shortId: string;
  title: string;
  author: PopulatedDoc<IUser>;
  views: number;
  comments: Types.DocumentArray<IComment>;
  editAt: Date;
  isEdit: IsEdit;
}

enum IsEdit {
  yes = 1,
  no = 0,
}

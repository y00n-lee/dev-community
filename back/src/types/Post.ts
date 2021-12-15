import { IComment } from "./Comment";
import { IUserDocument } from "./User";
import { Types, PopulatedDoc } from "mongoose";

export interface IPost {
  title: string;
  author: PopulatedDoc<IUserDocument>;
  views: number;
  comments: Types.DocumentArray<IComment>;
  editAt: Date;
  isEdit: IsEdit;
}

enum IsEdit {
  yes = 1,
  no = 0,
}

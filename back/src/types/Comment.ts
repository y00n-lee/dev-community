import { IUser } from "./User";
import { Document, PopulatedDoc } from "mongoose";

export interface IComment extends Document {
  shortId: string;
  author: PopulatedDoc<IUser>;
  content: string;
}

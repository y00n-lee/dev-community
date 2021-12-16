import { IUserDocument } from "./User";
import { PopulatedDoc } from "mongoose";

export interface IComment {
  author: PopulatedDoc<IUserDocument>;
  content: string;
}

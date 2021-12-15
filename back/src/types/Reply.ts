import { IUserDocument } from "./User";
import { PopulatedDoc } from "mongoose";

export interface IReply {
  author: PopulatedDoc<IUserDocument>;
  content: string;
}
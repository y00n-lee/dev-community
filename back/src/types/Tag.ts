import { Document } from "mongoose";

export interface ITag {
  content: string;
}

export interface ITagModel extends ITag, Document {}

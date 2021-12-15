import { Document, Model } from "mongoose";

export interface ITag {
  content: string;
}

export interface ITagDocument extends ITag, Document {}

export interface ITagModel extends Model<ITagDocument> {
  findOrCreate(tag: ITag): Promise<ITagDocument>;
}

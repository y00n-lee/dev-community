import { Schema } from "mongoose";
import { ITag, ITagDocument, ITagModel } from "@src/types/Tag";

export const TagSchema = new Schema<ITagDocument, ITagModel>(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

TagSchema.statics.findOrCreate = async function (tag: ITag) {
  const result = await this.findOne(tag);

  if (result) return result;

  return this.create(tag);
};

TagSchema.statics.getTags = async function (tags: string[]) {
  return await Promise.all(tags.map((tag: string) => this.findOrCreate({ content: tag })));
};

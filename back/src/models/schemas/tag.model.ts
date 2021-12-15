import { ITagModel } from "@src/types/Tag";
import { Schema } from "mongoose";

export const TagSchema = new Schema<ITagModel>(
  {
    content: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

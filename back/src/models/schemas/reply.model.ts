import { IReply } from "@src/types/Reply";
import { Schema } from "mongoose";

export const ReplySchema = new Schema<IReply>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

import { IPost } from "@src/types/Post";
import { Schema } from "mongoose";
import { CommentSchema } from "./comment.model";

export const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [CommentSchema],
    editAt: {
      type: Date,
      default: () => new Date(Date.now()),
    },
    isEdit: {
      enum: [0, 1],
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

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
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

PostSchema.statics.getPaginatedPosts = async function (
  query: object,
  page: number,
  perPage: number,
): Promise<number[]> {
  const [total, posts] = await Promise.all([
    this.countDocuments(query),
    this.find(query)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .populate("author"),
  ]);

  const totalPage = Math.ceil(total / perPage);
  return [posts, totalPage];
};

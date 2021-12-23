import { PostModel, UserModel, TagModel, CommentModel } from "@src/models";
import { PostDTO } from "@src/types/Post";
import { IUserDocument } from "@src/types/User";
import { clientErrHandler } from "@src/utils/clientErrHandler";

export class PostsService {
  constructor(
    private readonly postModel: typeof PostModel,
    private readonly userModel: typeof UserModel,
    private readonly tagModel: typeof TagModel,
    private readonly commentModel: typeof CommentModel,
  ) {}

  async getPosts(query: object, page: number, perPage: number) {
    return await this.postModel.getPaginatedPosts(query, page, perPage);
  }

  async getById(postId: string) {
    const post = await this.postModel
      .findById(postId)
      .populate("author", "-password -refreshToken -keyForVerify")
      .populate("members", "-password -refreshToken -keyForVerify")
      .populate({ path: "comments", populate: { path: "author" } })
      .populate({ path: "tags", populate: { path: "tags" } });

    post.views += 1;

    await post.save();

    if (!post) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    return post;
  }

  async createPost(postDTO: PostDTO) {
    const { title, content, userId, tagList, time } = postDTO;
    const tags = await this.tagModel.getTags(tagList);

    if (!title || !content) {
      throw clientErrHandler("제목과 내용을 입력해 주세요.", "NoTitleContent");
    }

    const author = (await this.userModel.findById(userId)) as IUserDocument;
    const post = await this.postModel.create({
      title,
      content,
      author,
      members: author,
      tags,
      time,
    });
    return post;
  }

  async editPost(postDTO: PostDTO) {
    const { postId, title, content, userId, tagList } = postDTO;
    const tags = await this.tagModel.getTags(tagList);

    if (!title || !content) {
      throw clientErrHandler("제목과 내용을 입력해 주세요.", "NoTitleContent");
    }

    const post = await this.postModel
      .findById(postId)
      .populate("author", "-password -refreshToken -keyForVerify");

    if (!post) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    if (post.author._id.toString() !== userId) {
      throw clientErrHandler("다른 사용자가 작성한 게시글입니다.", "NoTitleContent");
    }

    const updatedPost = await this.postModel.findOneAndUpdate(
      { _id: postId },
      { $set: { title, content, tags, isEdit: true } },
      { new: true },
    );
    return updatedPost;
  }

  async deletePost(postId: string, userId: string) {
    const post = await this.postModel
      .findById(postId)
      .populate("author", "-password -refreshToken -keyForVerify");

    if (!post) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    if (post.author._id.toString() !== userId) {
      throw clientErrHandler("다른 사용자가 작성한 게시글입니다.", "NoTitleContent");
    }

    return await this.postModel.deleteOne({ _id: postId });
  }

  async addMember(postId: string, userId: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);

    if (!post || !user) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    if (post.members.indexOf(user._id) >= 0) {
      throw clientErrHandler("이미 참여한 게시글입니다.", "AlreadyJoin");
    }

    post.members.push(user);
    user.posts.push(post);
    await post.save();
    await user.save();
    return post;
  }

  async deleteMember(postId: string, userId: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);
    if (!post || !user) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    const loc = post.members.indexOf(user._id);
    if (loc === -1) {
      throw clientErrHandler("참여하지 않은 상태입니다.", "NoMember");
    }

    post.members.pull(user);
    user.posts.pull(post);
    await post.save();
    await user.save();
    return post;
  }

  async addComment(postId: string, userId: string, content: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);
    if (!post || !user) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    if (!content) {
      throw clientErrHandler("내용을 입력해주세요.", "NoTitleContent");
    }

    const comment = await this.commentModel.create({ author: user, content });
    post.comments.push(comment);
    await post.save();
    return comment;
  }

  async deleteComment(postId: string, userId: string, commentId: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);
    const comment = await this.commentModel.findById(commentId);

    if (!post || !user) {
      throw clientErrHandler("잘못된 요청입니다.", "Bad");
    }

    if (!commentId || !comment) {
      throw clientErrHandler("유효하지 않은 댓글입니다.", "Bad");
    }

    post.comments.pull(comment);
    await post.save();
    await this.commentModel.deleteOne({ _id: commentId });
    return post;
  }

  async getByAuthor(id: string) {
    const post = await this.postModel
      .find({ author: id })
      .populate("author", "-password -refreshToken -keyForVerify")
      .populate("members", "-password -refreshToken -keyForVerify")
      .populate("comments")
      .populate("tags");

    return post;
  }
}

export const postsService = new PostsService(PostModel, UserModel, TagModel, CommentModel);

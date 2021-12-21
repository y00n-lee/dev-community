import { PostModel, UserModel, TagModel, CommentModel } from "@src/models";
import { PostDTO } from "@src/types/Post";

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
      .populate("comments")
      .populate("tags");
    return post;
  }

  async createPost(postDTO: PostDTO) {
    const { title, content, userId, tagList } = postDTO;
    const tags = await Promise.all(
      tagList.map((tag: string) => this.tagModel.findOrCreate({ content: tag })),
    );

    PostsService.checkTitleAndContent(title, content);

    const author = await this.userModel.findById(userId);
    const post = await this.postModel.create({ title, content, author, members: author, tags });
    return post;
  }

  async editPost(postDTO: PostDTO) {
    const { postId, title, content, userId, tagList } = postDTO;
    const tags = await Promise.all(
      tagList.map((tag: string) => this.tagModel.findOrCreate({ content: tag })),
    );

    PostsService.checkTitleAndContent(title, content);

    const post = await this.postModel
      .findById(postId)
      .populate("author", "-password -refreshToken -keyForVerify");

    PostsService.compareUser(post.author._id.toString(), userId);

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

    PostsService.compareUser(post.author._id.toString(), userId);

    return await this.postModel.deleteOne({ _id: postId });
  }

  async addMember(postId: string, userId: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);

    if (!post || !user) {
      const err = new Error("잘못된 요청입니다.");
      err.name = "NoAuth";
      throw err;
    }

    if (post.members.indexOf(user._id) >= 0) {
      const err = new Error("이미 참여한 게시글입니다.");
      err.name = "AlreadyJoin";
      throw err;
    }

    post.members.push(user);
    await post.save();
    return post;
  }

  async deleteMember(postId: string, userId: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);
    if (!post || !user) {
      const err = new Error("잘못된 요청입니다.");
      err.name = "NoAuth";
      throw err;
    }

    const loc = post.members.indexOf(user._id);
    if (loc === -1) {
      const err = new Error("참여하지 않은 상태입니다.");
      err.name = "NoMember";
      throw err;
    }

    post.members.pull(user);
    await post.save();
    return post;
  }

  async addComment(postId: string, userId: string, content: string) {
    const user = await this.userModel.findById(userId, "-password -refreshToken -keyForVerify");
    const post = await this.postModel.findById(postId);
    if (!post || !user) {
      const err = new Error("잘못된 요청입니다.");
      err.name = "NoAuth";
      throw err;
    }

    if (!content) {
      const err = new Error("내용을 입력해주세요.");
      err.name = "NoTitleContent";
      throw err;
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
      const err = new Error("잘못된 요청입니다.");
      err.name = "NoAuth";
      throw err;
    }

    if (!commentId || !comment) {
      const err = new Error("유효하지 않은 댓글입니다.");
      err.name = "NoAuth";
      throw err;
    }

    post.comments.pull(comment);
    await post.save();
    await this.commentModel.deleteOne({ _id: commentId });
    return post;
  }

  static checkTitleAndContent(title: string, content: string) {
    if (!title || !content) {
      const err = new Error("제목과 내용을 입력해 주세요.");
      err.name = "NoTitleContent";
      throw err;
    }
  }

  static compareUser(author: string, cur: string) {
    if (author !== cur) {
      const err = new Error("다른 사용자가 작성한 게시글입니다.");
      err.name = "NoAuth";
      throw err;
    }
  }
}

export const postsService = new PostsService(PostModel, UserModel, TagModel, CommentModel);

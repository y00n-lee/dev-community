import { Request, Response } from "express";
import { postsService, PostsService } from "@src/services/posts.service";
import { PostDTO } from "@src/types/Post";

export class PostsConttroller {
  constructor(private readonly postsService: PostsService) {}

  readPosts = async (req: Request, res: Response) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const [posts, totalPage] = await this.postsService.getPosts({}, page, perPage);
    return res.json({ status: true, data: { posts, page, perPage, totalPage } });
  };

  readPost = async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await this.postsService.getById(postId);
    return res.json({ status: true, data: { post } });
  };

  createPost = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { title, content, tagList } = req.body;
    const postDTO: PostDTO = { title, content, userId, tagList };

    await this.postsService.createPost(postDTO);
    return res.status(201).json({ status: true, message: "등록되었습니다." });
  };

  editPost = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;
    const { title, content, tagList } = req.body;
    const postDTO: PostDTO = { postId, title, content, userId, tagList };

    await this.postsService.editPost(postDTO);
    return res.json({ status: true, message: "수정되었습니다." });
  };

  deletePost = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    await this.postsService.deletePost(postId, userId);
    return res.json({ status: true, message: "삭제되었습니다." });
  };

  /* member */
  join = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    await this.postsService.addMember(postId, userId);
    return res.json({ status: true, message: "참여되었습니다." });
  };

  disjoin = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    await this.postsService.deleteMember(postId, userId);
    return res.json({ status: true, message: "취소되었습니다." });
  };

  /* comment */
  insertComment = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;
    const { content } = req.body;

    await this.postsService.addComment(postId, userId, content);
    return res.json({ status: true, message: "처리되었습니다." });
  };

  removeComment = async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;
    const { commentId } = req.body;

    await this.postsService.deleteComment(postId, userId, commentId);
    return res.json({ status: true, message: "삭제되었습니다." });
  };
}

export const postsController = new PostsConttroller(postsService);

import { Router, Request, Response } from "express";
import { PostModel } from "@src/models";
import passport from "passport";
import { postsService } from "@src/services/posts.service";
import { asyncHandler } from "@src/utils/asyncHandler";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 10);

    const [posts, totalPage] = await PostModel.getPaginatedPosts({}, page, perPage);
    return res.json({ status: true, data: { posts, page, perPage, totalPage } });
  }),
);

router.get(
  "/:postId",
  asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await postsService.getById(postId);
    return res.json({ status: true, data: { post } });
  }),
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { title, content, tagList } = req.body;

    await postsService.createPost(title, content, userId, tagList);
    return res.status(201).json({ status: true, message: "등록되었습니다." });
  }),
);

router.put(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;
    const { title, content, tagList } = req.body;

    await postsService.editPost(postId, title, content, userId, tagList);
    return res.json({ status: true, message: "수정되었습니다." });
  }),
);

router.delete(
  "/:postId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    await postsService.deletePost(postId, userId);
    return res.json({ status: true, message: "삭제되었습니다." });
  }),
);

/* add/remove member */
router.put(
  "/:postId/member",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    await postsService.addMember(postId, userId);
    return res.json({ status: true, message: "참여되었습니다." });
  }),
);

router.delete(
  "/:postId/member",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    await postsService.removeMember(postId, userId);
    return res.json({ status: true, message: "취소되었습니다." });
  }),
);
export default router;

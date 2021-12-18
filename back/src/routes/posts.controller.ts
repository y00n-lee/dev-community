import { Router } from "express";
import { PostModel } from "@src/models";
import passport from "passport";
import { postsService } from "@src/services/posts.service";
const router = Router();

router.get("/", async (req, res) => {
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  try {
    const [posts, totalPage] = await PostModel.getPaginatedPosts({}, page, perPage);
    return res.json({ status: true, data: { posts, page, perPage, totalPage } });
  } catch (err: any) {
    return res.status(404).json({ status: false, message: err.message });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postsService.getById(postId);
    return res.json({ status: true, data: { post } });
  } catch (err: any) {
    return res.status(404).json({ status: false, message: err.message });
  }
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id as string;
  const { title, content, tagList } = req.body;

  try {
    const post = await postsService.createPost(title, content, userId, tagList);
    return res.status(201).json({ status: true, data: { post } });
  } catch (err: any) {
    return res.status(400).json({ status: false, message: err.message });
  }
});

router.put("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id as string;
  const { postId } = req.params;
  const { title, content, tagList } = req.body;

  try {
    const post = await postsService.editPost(postId, title, content, userId, tagList);
    return res.json({ status: true, data: { post } });
  } catch (err: any) {
    return res.status(409).json({ status: false, message: err.message });
  }
});

router.put(
  "/:postId/member",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req?.user?.id as string;
    const { postId } = req.params;

    try {
      const post = await postsService.addMember(postId, userId);
      return res.json({ status: true, data: { post } });
    } catch (err: any) {
      return res.status(409).json({ status: false, message: err.message });
    }
  },
);

router.delete("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id as string;
  const { postId } = req.params;

  try {
    await postsService.deletePost(postId, userId);
    res.json({ status: true });
  } catch (err: any) {
    res.status(404).json({ status: false, message: err.message });
  }
});

export default router;

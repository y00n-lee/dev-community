import { Router } from "express";
import { PostModel, UserModel } from "@src/models";
import passport from "passport";
const router = Router();

router.get("/:boardNo", async (req, res) => {
  const { boardNo } = req.params;
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  try {
    const [posts, totalPage] = await PostModel.getPaginatedPosts({ boardNo }, page, perPage);
    res.json({ status: true, posts, page, perPage, totalPage });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
});

router.get("/:boardNo/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postId }).populate("author");
    res.json({ status: true, post });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
});

router.post("/:boardNo", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { title, content } = req.body;
  const { boardNo } = req.params;

  if (!title || !content) {
    return res.status(400).json({ status: false, message: "제목과 내용을 입력해 주세요." });
  }

  try {
    const author = await UserModel.findOne({ _id: userId });
    const post = await PostModel.create({ boardNo, title, content, author });
    res.json({ status: true, post });
  } catch (err) {
    res.status(400).json({ status: false, message: err });
  }
});

router.put(
  "/:boardNo/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req?.user?.id;
    const { postId } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ status: false, message: "제목과 내용을 입력해 주세요." });
    }

    try {
      const post = await PostModel.findOne({ _id: postId }).populate("author");

      if (post.author._id.toString() !== userId) {
        return res.json({ err: "수정할 수 없습니다." });
      }

      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { title, content, isEdit: true },
        { new: true },
      );
      res.json({ status: true, updatedPost });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  },
);

router.delete(
  "/:boardNo/:postId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req?.user?.id;
    const { postId } = req.params;

    try {
      const post = await PostModel.findOne({ _id: postId }).populate("author");
      if (post.author._id.toString() !== userId) {
        return res.status(400).json({ status: false, message: "수정할 수 없습니다." });
      }

      await PostModel.deleteOne({ _id: postId });
      res.json({ status: true });
    } catch (err) {
      res.status(400).json({ status: false, message: err });
    }
  },
);

export default router;

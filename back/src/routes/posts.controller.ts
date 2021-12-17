import { Router } from "express";
import { PostModel, UserModel } from "@src/models";
import passport from "passport";
const router = Router();

router.get("/", async (req, res) => {
  const { boardNo } = req.query;
  const page = Number(req.query.page || 1);
  const perPage = Number(req.query.perPage || 10);

  try {
    const [posts, totalPage] = await PostModel.getPaginatedPosts({ boardNo }, page, perPage);
    return res.json({ status: true, data: { posts, page, perPage, totalPage } });
  } catch (err) {
    return res.status(404).json({ status: false, message: err });
  }
});

router.get("/:postId", async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findOne({ _id: postId }).populate("author");
    return res.json({ status: true, data: post });
  } catch (err) {
    return res.status(404).json({ status: false, message: err });
  }
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { boardNo } = req.query;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ status: false, message: "제목과 내용을 입력해 주세요." });
  }

  try {
    const author = await UserModel.findOne({ _id: userId });
    const post = await PostModel.create({ boardNo, title, content, author });
    return res.status(201).json({ status: true, data: post });
  } catch (err) {
    return res.status(400).json({ status: false, message: err });
  }
});

router.put("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { postId } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ status: false, message: "제목과 내용을 입력해 주세요." });
  }

  try {
    const post = await PostModel.findOne({ _id: postId }).populate("author");

    if (post.author._id.toString() !== userId) {
      return res.status(409).json({ status: false, message: "수정할 수 없습니다." });
    }

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { title, content, isEdit: true },
      { new: true },
    );
    res.json({ status: true, data: updatedPost });
  } catch (err) {
    res.status(409).json({ status: false, message: err });
  }
});

router.delete("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findOne({ _id: postId }).populate("author");
    if (post.author._id.toString() !== userId) {
      return res.status(409).json({ status: false, message: "수정할 수 없습니다." });
    }

    await PostModel.deleteOne({ _id: postId });
    res.json({ status: true });
  } catch (err) {
    res.status(404).json({ status: false, message: err });
  }
});

export default router;

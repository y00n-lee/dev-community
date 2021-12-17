import { Router } from "express";
import { PostModel, UserModel, TagModel } from "@src/models";
import passport from "passport";
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
    const post = await PostModel.findById(postId).populate("author");
    return res.json({ status: true, data: post });
  } catch (err: any) {
    return res.status(404).json({ status: false, message: err.message });
  }
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { title, content, tagList } = req.body;

  const tags = await Promise.all(
    tagList.map((tag: string) => TagModel.findOrCreate({ content: tag })),
  );

  if (!title || !content) {
    return res.status(400).json({ status: false, message: "제목과 내용을 입력해 주세요." });
  }

  try {
    const author = await UserModel.findById(userId);
    const post = await PostModel.create({ title, content, author, members: author, tags });
    return res.status(201).json({ status: true, data: post });
  } catch (err: any) {
    return res.status(400).json({ status: false, message: err.message });
  }
});

router.put("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { postId } = req.params;
  const { title, content, tagList } = req.body;

  const tags = await Promise.all(
    tagList.map((tag: string) => TagModel.findOrCreate({ content: tag })),
  );

  if (!title || !content) {
    return res.status(400).json({ status: false, message: "제목과 내용을 입력해 주세요." });
  }

  try {
    const post = await PostModel.findById(postId).populate("author");

    if (post.author._id.toString() !== userId) {
      throw new Error("수정할 수 없습니다.");
    }

    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { title, content, tags, isEdit: true },
      { new: true },
    );
    return res.json({ status: true, data: updatedPost });
  } catch (err: any) {
    return res.status(409).json({ status: false, message: err.message });
  }
});

router.put(
  "/:postId/member",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req?.user?.id;
    const { postId } = req.params;

    try {
      const user = await UserModel.findById(userId);
      const post = await PostModel.findById(postId);
      if (!post || !user) {
        throw new Error("잘못된 요청입니다.");
      }
      if (post.members.id(user)) {
        throw new Error("이미 참여한 모임입니다.");
      }

      post.members.push(user);
      await post.save();
      return res.json({ status: true, data: post });
    } catch (err: any) {
      return res.status(409).json({ status: false, message: err.message });
    }
  },
);

router.delete("/:postId", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const userId = req?.user?.id;
  const { postId } = req.params;

  try {
    const post = await PostModel.findById(postId).populate("author");
    if (post.author._id.toString() !== userId) {
      throw new Error("제거할 수 없습니다.");
    }

    await PostModel.deleteOne({ _id: postId });
    res.json({ status: true });
  } catch (err: any) {
    res.status(404).json({ status: false, message: err.message });
  }
});

export default router;

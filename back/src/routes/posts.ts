import { Router } from "express";

import { asyncHandler } from "@src/utils/asyncHandler";
import { postsController } from "@src/controllers/posts.controller";
import { JwtAuthGurad } from "@src/passport/gurads/jwt-auth.guard";

const router = Router();

router.get("/", asyncHandler(postsController.readPosts));

router.get("/:postId", asyncHandler(postsController.readPost));

router.post("/", JwtAuthGurad, asyncHandler(postsController.createPost));

router.put("/:postId", JwtAuthGurad, asyncHandler(postsController.editPost));

router.delete("/:postId", JwtAuthGurad, asyncHandler(postsController.deletePost));

/* add/remove member */
router.put("/:postId/member", JwtAuthGurad, asyncHandler(postsController.join));

router.delete("/:postId/member", JwtAuthGurad, asyncHandler(postsController.disjoin));

/* insert/remove comment */
router.put("/:postId/comment", JwtAuthGurad, asyncHandler(postsController.insertComment));

router.delete("/:postId/comment", JwtAuthGurad, asyncHandler(postsController.removeComment));

export default router;

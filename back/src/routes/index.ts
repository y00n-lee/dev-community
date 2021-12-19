import { Router } from "express";

import authRouter from "./auth";
import usersRouter from "./user";
import postsRouter from "./posts.controller";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", usersRouter);
router.use("/posts", postsRouter);

export default router;

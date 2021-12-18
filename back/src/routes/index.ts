import { Router } from "express";
import authRouter from "./auth.controller";
import usersRouter from "./user.controller";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", usersRouter);

export default router;

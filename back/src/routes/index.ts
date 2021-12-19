import { Router } from "express";
import authRouter from "./auth";
import usersRouter from "./user";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", usersRouter);

export default router;

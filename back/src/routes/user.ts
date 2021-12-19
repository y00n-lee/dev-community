import { Router } from "express";

import { asyncHandler } from "@src/utils/asyncHandler";
import { userController } from "@src/controllers/user.controller";
import { JwtAuthGurad } from "@src/passport/gurads/jwt-auth.guard";

const router = Router();

router.post("/signup", asyncHandler(userController.signup));

router.get("/:id", asyncHandler(userController.getUserInfo));

router.post("/password/reset", asyncHandler(userController.resetPassword));

router.put("/:id/edit", JwtAuthGurad, asyncHandler(userController.editUserInfo));

router.put("/password/change", JwtAuthGurad, asyncHandler(userController.changePassword));

export default router;

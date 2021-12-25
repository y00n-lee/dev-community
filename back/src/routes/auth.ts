import { Router } from "express";
import { authController } from "@controllers/auth.controller";
import { asyncHandler } from "@utils/asyncHandler";
import { ExpiredJwtAuthGurad, RJwtAuthGurad } from "@passport/gurads/jwt-auth.guard";

const router = Router();

router.post("/signin", asyncHandler(authController.signin));

router.post("/signout", ExpiredJwtAuthGurad, asyncHandler(authController.signout));

router.post("/refresh", ExpiredJwtAuthGurad, RJwtAuthGurad, asyncHandler(authController.refresh));

router.get("/confirmEmail", asyncHandler(authController.confirmEmail));

export default router;

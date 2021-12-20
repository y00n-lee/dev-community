import { Router } from "express";
import { authController } from "@src/controllers/auth.controller";
import { asyncHandler } from "@src/utils/asyncHandler";
import {
  JwtAuthGurad,
  ExpiredJwtAuthGurad,
  RJwtAuthGurad,
} from "@src/passport/gurads/jwt-auth.guard";

const router = Router();

router.post("/signin", asyncHandler(authController.signin));

router.post("/signout", JwtAuthGurad, asyncHandler(authController.signout));

router.post("/refresh", ExpiredJwtAuthGurad, RJwtAuthGurad, asyncHandler(authController.refresh));

router.get("/confirmEmail", asyncHandler(authController.confirmEmail));

export default router;

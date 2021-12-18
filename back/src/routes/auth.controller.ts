import passport from "passport";
import { NextFunction, Request, Response, Router } from "express";

import { authService } from "@src/services/auth.service";
import { userService } from "@src/services/user.service";
import { jwtContents } from "@src/utils/constants";
import { asyncHandler } from "@src/utils/asyncHandler";

import { ITokenUser, IUserDocument } from "@src/types/User";

const router = Router();
const EXPIRED = 1000 * 60 * 60 * 24 * 7;

router.post(
  "/signin",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", { session: false }, async (err, _user: ITokenUser, info) => {
      if (err) return next(err);
      if (!_user) return res.status(401).json({ status: false, message: info.message });

      const { id } = _user;

      const accessToken = await authService.signin({ id });
      const user = (await userService.getById(id, {
        refreshToken: 0,
        keyForVerify: 0,
        password: 0,
      })) as IUserDocument;

      await user.populate("tags");

      res.cookie(jwtContents.header, accessToken, {
        httpOnly: true,
        maxAge: EXPIRED,
      });

      return res.json({ status: true, data: { user } });
    })(req, res, next);
  }),
);

router.post(
  "/refresh",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const _user = req.user;
    if (!_user) return res.json({ status: false });

    const { id } = _user;

    const isVerifiedToken = await authService.verifyRefresh({ id });

    if (!isVerifiedToken)
      return res.status(401).json({ status: false, err: "다시 로그인 해주세요" });

    const accessToken = await authService.signin({ id });

    res.cookie(jwtContents.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return res.json({ status: true });
  }),
);

router.post(
  "/signout",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const _user = req.user;
    if (!_user)
      return res.status(401).json({ status: false, message: "유저가 존재하지 않습니다." });

    const { id } = _user;

    await userService.updateByQuery({ _id: id }, { refreshToken: null });
    res.clearCookie(jwtContents.header);

    return res.json({ status: true });
  }),
);

router.get(
  "/confirmEmail",
  asyncHandler(async (req: Request, res: Response) => {
    const key = req.query.key as string;

    await userService.updateByQuery({ keyForVerify: key }, { emailVerified: true });

    res.writeHead(302, {
      // 프론트 주소
      Location: "https://www.naver.com/",
    });
    res.end();
  }),
);

export default router;

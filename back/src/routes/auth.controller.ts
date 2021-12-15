import { authService } from "@src/services/auth.service";
import { userService } from "@src/services/user.service";
import { ITokenUser, IUserDocument } from "@src/types/User";
import { jwtContents } from "@src/utils/constants";
import { Router } from "express";
import passport from "passport";

const router = Router();
const EXPIRED = 1000 * 60 * 60 * 24 * 7;

router.post("/signin", async (req, res, next) => {
  passport.authenticate("local", { session: false }, async (err, _user: ITokenUser, info) => {
    if (err) return next(err);
    if (!_user) return res.status(401).json({ status: false, err: info.message });

    const { id } = _user;

    const accessToken = await authService.signin({ id });
    const user = (await userService.getById(id)) as IUserDocument;

    await user.populate("tags");

    res.cookie(jwtContents.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    res.json({ status: true, user });
  })(req, res, next);
});

router.post("/refresh", async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, _user: ITokenUser) => {
    if (!_user) return res.json({ status: false });

    const { id } = _user;

    const isVerifiedToken = await authService.verifyRefresh({ id });

    if (!isVerifiedToken) return res.json({ status: false, err: "expried refresh token" });

    const accessToken = await authService.signin({ id });

    res.cookie(jwtContents.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    return res.json({ status: true });
  })(req, res, next);
});

router.post("/signout", async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, _user: ITokenUser) => {
    if (!_user)
      return res.status(401).json({ status: false, message: "유저가 존재하지 않습니다." });

    const { id } = _user;

    await userService.updateRefreshToken(id, null);
    res.clearCookie(jwtContents.header);

    return res.json({ status: true });
  })(req, res, next);
});

export default router;

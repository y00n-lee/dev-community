import { Router } from "express";
import { userService } from "@src/services/user.service";
import { ICreateUser } from "@src/types/CoreResponse";
import passport from "passport";
import { ITokenUser } from "@src/types/User";
import { mailAuthentication } from "@src/utils/mailAuth";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const result = (await userService.createUser(req.body)) as ICreateUser;

  if (!result.status) return res.status(401).json(result);

  const host = `${req.protocol}://${req.get("host")}`;
  const keyForVerify = result.keyForVerify as string;

  await mailAuthentication(host, req.body.email, keyForVerify)
    .then(() => res.json({ status: true }))
    .catch((e) => next(e));
});

router.get("/:id", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, _user: ITokenUser) => {
    if (err) return next(err);
    if (!_user)
      return res.status(401).json({ status: false, message: "유저가 존재하지 않습니다." });

    const user = await userService.getById(_user.id, { refreshToken: 0 });

    return res.json(user);
  })(req, res, next);
});

export default router;

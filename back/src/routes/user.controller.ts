import passport from "passport";
import { Router } from "express";
import { userService } from "@src/services/user.service";
import { ICreateUser } from "@src/types/CoreResponse";
import { ITokenUser, IUserDocument } from "@src/types/User";
import { emailAuthentication, makeVerifyKey, sendChangedPassword } from "@src/utils/mailAuth";
import { makeHashPassword } from "@src/utils/passwordRelated";
import { jwtContents } from "@src/utils/constants";

const router = Router();

router.post("/signup", async (req, res, next) => {
  const result = (await userService.createUser(req.body)) as ICreateUser;

  if (!result.status) return res.status(401).json(result);

  const host = `${req.protocol}://${req.get("host")}`;
  const keyForVerify = result.keyForVerify as string;

  await emailAuthentication(host, req.body.email, keyForVerify)
    .then(() => res.json({ status: true }))
    .catch((e) => next(e));
});

router.get("/:id", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, _user: ITokenUser) => {
    if (err) return next(err);
    if (!_user)
      return res.status(401).json({ status: false, message: "유저가 존재하지 않습니다." });

    const user = await userService.getById(_user.id, { refreshToken: 0, password: 0 });

    return res.json(user);
  })(req, res, next);
});

router.post("/password/reset", async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userService.getByEmail(email);

    if (!user)
      return res
        .status(401)
        .json({ status: false, message: "해당 메일로 가입된 사용자가 없습니다." });

    const password = makeVerifyKey(5);
    const hashedPassword = await makeHashPassword(password);

    await userService.updateByQuery({ email }, { password: hashedPassword, passwordReset: true });

    await sendChangedPassword(email, password);

    res.json({ status: true, message: "임시 비밀번호가 메일에 전송됐습니다." });
  } catch (e) {
    next(e);
  }
});

router.post("/password/change", async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, async (err, _user: ITokenUser) => {
    if (err) return next(err);
    if (!_user) return res.status(401).json({ status: false, message: "로그인 후 가능합니다." });

    // 임시 비밀번호, 비밀번호
    const { currentPassword, password } = req.body;

    const user = (await userService.getById(_user.id, { refreshToken: 0 })) as IUserDocument;

    const isCompared = await user.comparePassword(currentPassword);

    if (!isCompared) return res.json({ status: false, message: "비밀번호가 일치하지 않습니다." });

    const hashedPassword = await makeHashPassword(password);

    await userService.updateByQuery(
      { _id: user.id },
      { password: hashedPassword, passwordReset: false },
    );

    await userService.updateByQuery({ _id: _user.id }, { refreshToken: null });
    res.clearCookie(jwtContents.header);

    res.json({ status: true, message: "비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요" });
  })(req, res, next);
});

export default router;

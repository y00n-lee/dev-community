import passport from "passport";
import { Request, Response, Router } from "express";

import { userService } from "@src/services/user.service";
import { ICreateUser } from "@src/types/CoreResponse";
import { IUserDocument } from "@src/types/User";
import { emailAuthentication, makeVerifyKey, sendChangedPassword } from "@src/utils/mailAuth";
import { makeHashPassword } from "@src/utils/passwordRelated";
import { jwtContents } from "@src/utils/constants";
import { asyncHandler } from "@src/utils/asyncHandler";

const router = Router();

router.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response) => {
    const result = (await userService.createUser(req.body)) as ICreateUser;

    if (!result.status) return res.status(401).json(result);

    const host = `${req.protocol}://${req.get("host")}`;
    const keyForVerify = result.keyForVerify as string;

    await emailAuthentication(host, req.body.email, keyForVerify);

    return res.json({ status: true });
  }),
);

router.get(
  "/:id",
  asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getById(req.params.id, { refreshToken: 0, password: 0 });

    if (!user) return res.status(401).json({ status: false, message: "유저가 존재하지 않습니다." });

    await user.populate("tags");
    await user.populate("posts");

    return res.json({ status: true, data: { user } });
  }),
);

router.post(
  "/password/reset",
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await userService.getByEmail(email);

    if (!user)
      return res
        .status(401)
        .json({ status: false, data: { message: "해당 메일로 가입된 사용자가 없습니다." } });

    const password = makeVerifyKey(5);
    const hashedPassword = await makeHashPassword(password);

    await userService.updateByQuery({ email }, { password: hashedPassword, passwordReset: true });

    await sendChangedPassword(email, password);

    return res.json({ status: true, data: { message: "임시 비밀번호가 메일에 전송됐습니다." } });
  }),
);

router.put(
  "/:id/edit",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const _user = req.user;

    if (!_user)
      return res
        .status(401)
        .json({ status: false, data: { message: "로그인 후 사용가능합니다." } });

    res.send("asd");
  }),
);

router.put(
  "/password/change",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(async (req: Request, res: Response) => {
    const _user = req.user;
    if (!_user) return res.status(401).json({ status: false, message: "로그인 후 가능합니다." });

    // 임시 비밀번호, 비밀번호
    const { currentPassword, password } = req.body;

    const user = (await userService.getById(_user.id, { refreshToken: 0 })) as IUserDocument;

    const isCompared = await user.comparePassword(currentPassword);

    if (!isCompared)
      return res.status(401).json({ status: false, message: "비밀번호가 일치하지 않습니다." });

    const hashedPassword = await makeHashPassword(password);

    await userService.updateByQuery(
      { _id: user.id },
      { password: hashedPassword, passwordReset: false },
    );

    await userService.updateByQuery({ _id: _user.id }, { refreshToken: null });
    res.clearCookie(jwtContents.header);

    return res.json({
      status: true,
      data: { message: "비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요" },
    });
  }),
);

export default router;

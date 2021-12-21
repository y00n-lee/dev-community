import { Request, Response } from "express";

import { UserService, userService } from "@src/services/user.service";
import { emailAuthentication, makeVerifyKey, sendChangedPassword } from "@src/utils/mailAuth";
import { makeHashPassword } from "@src/utils/passwordRelated";
import { jwtContents } from "@src/utils/constants";

import { ICreateUser } from "@src/types/CoreResponse";
import { ITokenUser, IUserDocument } from "@src/types/User";

export class UserController {
  constructor(private readonly userService: UserService) {}

  signup = async (req: Request, res: Response) => {
    const result = (await this.userService.createUser(req.body)) as ICreateUser;

    if (!result.status) return res.status(401).json(result);

    const host = `${req.protocol}://${req.get("host")}`;
    const keyForVerify = result.keyForVerify as string;

    await emailAuthentication(host, req.body.email, keyForVerify);

    return res.json({ status: true });
  };

  getUserInfo = async (req: Request, res: Response) => {
    const _user = req.user as ITokenUser;
    const user = await this.userService.getById(req.params.id, { refreshToken: 0, password: 0 });

    if (!user) return res.status(403).json({ status: false, message: "유저가 존재하지 않습니다." });

    await user.populate("tags");
    await user.populate("posts");

    const same = _user.id === user.id;

    return res.json({ status: true, data: { user, same } });
  };

  editUserInfo = async (req: Request, res: Response) => {
    const _user = req.user as ITokenUser;
    const { id } = req.params;
    const { name } = req.query;

    if (!req.user)
      return res.status(401).json({ status: false, message: "로그인 후 사용가능합니다." });

    if (id !== _user.id)
      return res
        .status(403)
        .json({ status: false, message: "로그인한 사용자의 프로필만 수정 가능합니다." });

    if (name === "tags") await this.userService.updateSkillTags(id, req.body.data);
    else await this.userService.updateByQuery({ _id: id }, { nickname: req.body.data });

    res.json({ status: true, message: "변경되었습니다." });
  };

  resetPassword = async (req: Request, res: Response) => {
    const { email } = req.body;
    const user = await this.userService.getByEmail(email);

    if (!user)
      return res
        .status(403)
        .json({ status: false, data: { message: "해당 메일로 가입된 사용자가 없습니다." } });

    const password = makeVerifyKey(5);
    const hashedPassword = await makeHashPassword(password);

    await this.userService.updateByQuery(
      { email },
      { password: hashedPassword, passwordReset: true },
    );

    await sendChangedPassword(email, password);

    return res.json({ status: true, data: { message: "임시 비밀번호가 메일에 전송됐습니다." } });
  };

  changePassword = async (req: Request, res: Response) => {
    const _user = req.user;
    if (!_user) return res.status(401).json({ status: false, message: "로그인 후 가능합니다." });

    // 임시 비밀번호, 비밀번호
    const { currentPassword, password } = req.body;

    const user = (await this.userService.getById(_user.id, { refreshToken: 0 })) as IUserDocument;

    const isCompared = await user.comparePassword(currentPassword);

    if (!isCompared)
      return res.status(401).json({ status: false, message: "비밀번호가 일치하지 않습니다." });

    const hashedPassword = await makeHashPassword(password);

    await this.userService.updateByQuery(
      { _id: user.id },
      { password: hashedPassword, passwordReset: false, refreshToken: null },
    );

    res.clearCookie(jwtContents.header);
    res.clearCookie(jwtContents.header_refresh);

    return res.json({
      status: true,
      message: "비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요",
    });
  };
}

export const userController = new UserController(userService);

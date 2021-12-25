import passport from "passport";
import { NextFunction, Request, Response } from "express";

import { AuthService, authService } from "@services/auth.service";
import { UserService, userService } from "@services/user.service";

import { jwtContents, url } from "@utils/constants";
import { ITokenUser, IUserDocument } from "@src/types/User";

const EXPIRED = 1000 * 60 * 60 * 24 * 7;

export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  signin = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", { session: false }, async (err, _user: ITokenUser, info) => {
      if (err) return next(err);
      if (!_user) return res.status(401).json({ status: false, message: info.message });

      const { id } = _user;

      const [accessToken, refreshToken] = await this.authService.signin({ id });
      const user = (await this.userService.getById(id, {
        refreshToken: 0,
        keyForVerify: 0,
        password: 0,
      })) as IUserDocument;

      await user.populate("tags");

      res.cookie(jwtContents.header, accessToken, {
        httpOnly: true,
        maxAge: EXPIRED,
      });

      res.cookie(jwtContents.header_refresh, refreshToken, {
        httpOnly: true,
        maxAge: EXPIRED,
      });

      return res.json({ status: true, data: { user } });
    })(req, res, next);
  };

  signout = async (req: Request, res: Response) => {
    const _user = req.user as IUserDocument;

    if (!_user)
      return res.status(401).json({ status: false, message: "유저가 존재하지 않습니다." });

    const { id } = _user;

    await this.userService.updateByQuery({ _id: id }, { refreshToken: null });
    res.clearCookie(jwtContents.header);
    res.clearCookie(jwtContents.header_refresh);

    return res.json({ status: true });
  };

  refresh = async (req: Request, res: Response) => {
    const _user = req.user as ITokenUser;

    const isVerifiedToken = await this.authService.verifyRefresh(_user);

    if (!isVerifiedToken)
      return res.status(401).json({ status: false, err: "다시 로그인 해주세요" });

    const [accessToken, refreshToken] = await this.authService.signin(_user);

    res.cookie(jwtContents.header, accessToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });

    res.cookie(jwtContents.header_refresh, refreshToken, {
      httpOnly: true,
      maxAge: EXPIRED,
    });
    const user = (await this.userService.getById(_user.id)) as IUserDocument;

    return res.json({ status: true, data: { id: user.id, nickname: user.nickname } });
  };

  confirmEmail = async (req: Request, res: Response) => {
    const key = req.query.key as string;

    await this.userService.updateByQuery({ keyForVerify: key }, { emailVerified: true });

    res.writeHead(302, {
      // 프론트 주소
      Location: url,
    });
    res.end();
  };
}

export const authController = new AuthController(authService, userService);

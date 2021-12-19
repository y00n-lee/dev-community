import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const JwtAuthGurad = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("jwt", { session: false }, async (err, _user, info) => {
      if (!_user) next(info);
      req.user = _user;
      next();
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

// 엑세스 토큰 검증
export const ExpiredJwtAuthGurad = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("jwt", { session: false }, async (err, _user, info) => {
      req.user = _user;
      next();
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

// 리프레시 토큰 검증
export const RJwtAuthGurad = (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate("refresh-jwt", { session: false }, async (err, _user, info) => {
      // 두 개의 토큰 모두 만료되었을 경우
      if (!_user && !req.user) next({ message: "다시 로그인 해주세요." });
      const user = req.user || _user;
      req.user = user;
      next();
    })(req, res, next);
  } catch (e) {
    next(e);
  }
};

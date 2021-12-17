import { NextFunction, Request, Response } from "express";
import { jwtContents } from "@src/utils/constants";
import { decryptValue } from "@src/utils/crypto";

export const setAuth = (req: Request, res: Response, next: NextFunction) => {
  const authCookies = req.cookies[jwtContents.header];

  if (authCookies) req.headers.authorization = `Bearer ${decryptValue(authCookies)}`;
  return next();
};

import { NextFunction, Request, Response } from "express";
import { jwtContents } from "@utils/constants";
import { decryptValue } from "@utils/crypto";

export const setAuth = (req: Request, _: Response, next: NextFunction) => {
  const authCookies = req.cookies[jwtContents.header];
  const rCookies = req.cookies[jwtContents.header_refresh];

  if (authCookies) req.headers.authorization = `Bearer ${decryptValue(authCookies)}`;
  if (rCookies) req.headers.refresh = `${decryptValue(rCookies)}`;

  return next();
};

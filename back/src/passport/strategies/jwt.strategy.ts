import { Strategy as JStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { jwtContents } from "@utils/constants";

const JwtOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtContents.secret,
};

const JwtVerify = (payload: any, done: VerifiedCallback) => {
  try {
    if (!payload) return done(null, false, { message: "로그인 후 이용 가능합니다." });
    done(null, { id: payload.id });
  } catch (e: any) {
    done(e, false);
  }
};

const RefreshJwtOpt = {
  jwtFromRequest: ExtractJwt.fromHeader("refresh"),
  secretOrKey: jwtContents.secret,
};

const RefreshJwtVerify = async (payload: any, done: VerifiedCallback) => {
  try {
    done(null, { id: payload.id });
  } catch (e: any) {
    done(e, false);
  }
};

export const JwtStrategy = new JStrategy(JwtOpt, JwtVerify);
export const ReFreshJwtStrategy = new JStrategy(RefreshJwtOpt, RefreshJwtVerify);

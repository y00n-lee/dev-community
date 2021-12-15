import { Strategy as JStrategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { userService } from "@src/services/user.service";
import { jwtContents } from "@src/utils/constants";

const JwtOpt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: true,
  secretOrKey: jwtContents.secret,
};

const JwtVerify = async (payload: any, done: VerifiedCallback) => {
  try {
    if (!payload) return done(null, false);

    const user = await userService.getById(payload.id);

    return done(null, user);
  } catch (e) {
    done(e, false);
  }
};

export const JwtStrategy = new JStrategy(JwtOpt, JwtVerify);

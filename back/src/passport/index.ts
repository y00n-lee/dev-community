import passport from "passport";

import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

export const PassportConfigunation = () => {
  passport.use("local", LocalStrategy);
  passport.use("jwt", JwtStrategy);
};

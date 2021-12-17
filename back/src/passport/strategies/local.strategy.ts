import { Strategy as LStrategy } from "passport-local";
import { authService } from "@src/services/auth.service";

export const LocalStrategy = new LStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const { user, message } = await authService.validateUser(email, password);

      if (!user) return done(null, false, { message: message || "" });

      return done(null, { id: user.id });
    } catch (error) {
      return done(error, null);
    }
  },
);

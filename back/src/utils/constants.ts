import { config } from "dotenv";

config();

export const jwtContents = {
  secret: process.env.JWT_SECRET_KEY as string,
  header: process.env.JWT_HEADER as string,
};

export const secretContents = {
  signin: process.env.SIGNIN_SECRET_KEY as string,
};

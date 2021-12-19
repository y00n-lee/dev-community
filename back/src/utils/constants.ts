import { config } from "dotenv";

config();

export const jwtContents = {
  secret: process.env.JWT_SECRET_KEY as string,
  header: process.env.JWT_HEADER as string,
  header_refresh: process.env.JWT_HEADER_REFRESH as string,
};

export const secretContents = {
  signin: process.env.SIGNIN_SECRET_KEY as string,
};

export const url = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/";

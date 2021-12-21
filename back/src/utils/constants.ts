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

export const prod = process.env.NODE_ENV === "production";

export const url = prod ? "" : "http://localhost:3000/";

export const configs = {
  DB_ID: process.env.DB_ID as string,
  DB_PASSWORD: process.env.DB_PASSWORD as string,
  PORT: process.env.PORT as string,
};

import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import hpp from "hpp";
import helmet from "helmet";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { setAuth } from "./middlewares/setAuth";
import { url, configs, prod } from "./utils/constants";
import { connectDB } from "./utils/connectDB";
import { PassportConfigunation } from "./passport";
import routes from "./routes";

PassportConfigunation();
connectDB();

const app = express();

if (prod) {
  app.use(hpp());
  app.use(helmet());
}

app.use(
  cors({
    origin: url,
    credentials: true,
  }),
);
app.use(logger(prod ? "combined" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(setAuth);

app.get("/", (_, res) => {
  res.send("Hello Express Server!");
});

app.use(routes);

app.use(errorMiddleware);

app.listen(configs.PORT, () => {
  console.log(`Example app listening at http://localhost:${configs.PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import { PassportConfigunation } from "./passport";
import { setAuth } from "./middlewares/setAuth";
import routes from "./routes";

dotenv.config();
PassportConfigunation();

const uri = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASSWORD}@simple-board-cluster.aat6r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, () => {
  console.log("MongoDB Connected");
});

const app = express();

app.use(logger("dev"));
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

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});

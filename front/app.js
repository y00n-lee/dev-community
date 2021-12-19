const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();

// view engine setup
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public/")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.render("index");
});

app.get("/signin", (_, res) => {
  res.render("signin");
});

app.get("/signup", (_, res) => {
  res.render("signup");
});

app.get("/posts", (_, res) => {
  res.render("posts");
});

app.get("/posts/:id", (req, res) => {
  res.render("gatherboardDetail");
});

app.get("/edit/post/:id", (_, res) => {
  res.render("gatherboardMake");
});

app.get("/user/:id", (_, res) => {
  res.render("profile");
});

app.get("/edit/user/:id", (_, res) => {
  res.render("gatherboardMake");
});

app.use((err, _, res, __) => {
  res.send("asd");
});

app.listen(3000, () => {
  console.log("front server, http://localhost:3000");
});

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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.render("index", { data: 300 });
});

app.get("/posts", (req, res) => {
  res.render("posts");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/asd", (req, res) => {
  res.render("asd");
});

app.listen(3000, () => {
  console.log("front server, http://localhost:3000");
});

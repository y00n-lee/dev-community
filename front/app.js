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

// 메인 페이지
app.get("/", (_, res) => res.render("main"));

// 로그인 페이지
app.get("/signin", (_, res) => res.render("user/signin"));

// 회원가입 페이지
app.get("/signup", (_, res) => res.render("user/signup"));

// 전체 게시글 페이지
app.get("/posts", (_, res) => res.render("post/posts"));

// 단일 게시글 페이지
app.get("/posts/:id", (req, res) => res.render("post/gatherboardDetail"));

// 게시글 작성 페이지
app.get("/post", (_, res) => res.render("post/gatherboardMake"));

// 유저 프로필 페이지
app.get("/user/:id", (_, res) => res.render("user/user"));

// 유저 정보 수정 페이지
app.get("/edit/user/:id", (req, res) => res.render("user/userUpdate"));

// 비밀번호 재발급 페이지
app.get("/issuedPassword", (_, res) => res.render("user/issuedPassword"));

// 프로젝트 참여자 목록 페이지
app.get("/project/:id", (_, res) => res.render("user/member"));

// 에러 페이지
app.use("*", (req, res) => {
  res.render("error");
});

app.use((err, _, res, __) => {
  res.render("error");
});

app.listen(3000, () => {
  console.log("front server, http://localhost:3000");
});

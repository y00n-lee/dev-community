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
app.get("/signin", (_, res) => res.render("signin"));

// 회원가입 페이지
app.get("/signup", (_, res) => res.render("signup"));

// 전체 게시글 페이지
app.get("/posts", (_, res) => res.render("posts"));

// 단일 게시글 페이지
app.get("/posts/:id", (req, res) => res.render("gatherboardDetail"));

// 게시글 수정 페이지
app.get("/edit/post/:id", (_, res) => res.render("gatherboardMake"));

// 유저 프로필 페이지
app.get("/user/:id", (_, res) => res.render("user"));

// 유저 정보 수정 페이지
app.get("/edit/user/:id", (req, res) => res.render("userUpdate"));

// 비밀번호 재발급 페이지
app.get("/issuedPassword", (_, res) => res.render("issuedPassword"));

// 비밀번호 변경 페이지

// 프로젝트 참여자 목록 페이지

app.use((err, _, res, __) => {
  res.send("asd");
});

app.listen(3000, () => {
  console.log("front server, http://localhost:3000");
});

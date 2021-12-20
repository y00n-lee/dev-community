import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createEleClass, addTextNode } from "./components/utils.js";

//DOM elements
const body = document.querySelector("body");
const header = makeHeader();
const footer = makeFooter();
const main = document.querySelector("#main");
const section = document.querySelector("#main section");

// Header, footer append
body.insertBefore(header, main);
body.insertBefore(footer, document.querySelector("script"));

// set page title
addTextNode(document.querySelector(".group-title"), "이 프로젝트 그룹 이름");

// // 각각의 멤버 카드 article로 생성
//TODO : 그룹 멤버 수 데이터 가져오기
const memberCount = 5;
//TODO : 각 멤버 데이터 가져오기
const stacks = ["자바스크립트", "노드js", "react", "vue", "mongodb"];

for (let i = 0; i < memberCount; i++) {
  const article = createEleClass("article", "flex-item");
  const memberImg = createEleClass("img", "image"); // 회원 프로필 사진
  const memberName = createEleClass("p", "member-name"); // 회원 이름
  const memberIntro = createEleClass("p", "introduce"); // 회원 소개말
  const memberSkill = createEleClass("p", "member-skill"); // 회원 기술 스택

  // 회원 데이터 불러오기
  memberImg.setAttribute("src", "../img/about/man1.png");
  addTextNode(memberName, "김병철");
  addTextNode(memberIntro, `안녕하세요, 잘 부탁드립니다~~!안녕하세요, 잘 부탁드립니다~~!`);
  addTextNode(memberSkill, stacks[i]);
  article.appendChild(memberImg);
  article.appendChild(memberName);
  article.appendChild(memberIntro);
  article.appendChild(memberSkill);

  section.appendChild(article);
}

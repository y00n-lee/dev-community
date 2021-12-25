import { makeHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { getPostList } from "../../components/postList.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// 로그인 여부에 따른 글작성
const user = JSON.parse(sessionStorage.getItem("user"));
const writeBtn = document.querySelector(".post-write");

writeBtn.addEventListener("click", () => {
  if (!user) alert("로그인 후 이용 가능합니다.");
  else writeBtn.setAttribute("href", `/post`);
});

const parsingUrl = {};
window.location.search
  .substring(1)
  .split("&")
  .forEach((el) => {
    const [key, value] = el.split("=");
    parsingUrl[key] = value;
  });

const [perPage, page] = [parsingUrl["perPage"] || 6, parsingUrl["page"] || 1];

getPostList(page, perPage);

// Footer
const footer = makeFooter();
container.append(footer);

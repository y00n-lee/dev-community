import { makeHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { getPostList } from "../../components/postList.js";
import { checkSignin } from "../../api/dummy/index.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// 로그인 여부에 따른 글작성
const writeBtn = document.querySelector(".post-write");
writeBtn.addEventListener("click", () => {
  checkSignin().then((res) => {
    // 로그인이 안되어있다면
    if (!res.status) alert("로그인을 하셔야합니다.");
    // 로그인이 되어있다면
    else {
      writeBtn.setAttribute("href", `/post`);
    }
  });
});

const parsingUrl = {};
window.location.search
  .substring(1)
  .split("&")
  .forEach((el) => {
    const [key, value] = el.split("=");
    console.log(key, value);
    parsingUrl[key] = value;
  });

const [perPage, page] = [parsingUrl["perPage"] || 6, parsingUrl["page"] || 1];

getPostList(page, perPage);

// Footer
const footer = makeFooter();
container.append(footer);

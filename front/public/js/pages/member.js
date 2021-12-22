import { makeHeader } from "../components/header.js";
import { makeFooter } from "../components/footer.js";
import { createEleClass, addTextNode, addChild } from "../components/utils.js";
import { makeSkillTag } from "../components/tag.js";
import { getPost } from "../api/dummy/index.js";

//DOM elements
const container = document.getElementsByClassName("container")[0];
const header = makeHeader();
const footer = makeFooter();
const main = document.getElementById("main");
const section = document.querySelector("#main section");

// Header, footer append
container.insertBefore(header, main);
container.appendChild(footer);

const pathname = window.location.pathname.split("/");
const currentPostId = pathname[pathname.length - 1];

// get user data
window.onload = (function () {
  getPost(currentPostId)
    .then((res) => {
      const post = res.data.post;
      const members = post.members;
      addTextNode(document.querySelector(".page-title"), `${post.title}`);
      for (let i = 0; i < members.length; i++) {
        const { nickname, tags, email } = members[i];
        makeMemberCard(nickname, tags, email);
      }
    })
    .catch((e) => alert(e.message));
})();

// 멤버 카드 생성 함수
function makeMemberCard(nickname, tags, email) {
  const article = createEleClass("article", "flex-item");
  const memberName = createEleClass("p", "member-name"); // 회원 이름
  const memberEmail = createEleClass("p", "email"); // 회원 이메일

  addChild(article, memberName, nickname);
  for (let i = 0; i < tags.length; i++) article.appendChild(makeSkillTag(tags[i], true, false));

  addChild(article, memberEmail, email);
  section.appendChild(article);
}

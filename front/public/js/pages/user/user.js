import { makeHeader, responsiveHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { addTextNode } from "../../components/utils.js";
import { makeSkillTag } from "../../components/tag.js";
import { getUserInfo } from "../../api/user/getUserInfo.js";

//DOM elements
const container = document.getElementsByClassName("container")[0];
const header = makeHeader();
const footer = makeFooter();
const main = document.getElementById("main");
const updateBtn = document.getElementById("updateBtn");
const tagField = document.getElementById("tagField");
const postField = document.getElementById("postField");

// Header, footer append
container.insertBefore(header, main);
container.appendChild(footer);

const pathname = window.location.pathname.split("/");
const currentUserId = pathname[pathname.length - 1];

// get user data
window.onload = (function () {
  getUserInfo(currentUserId)
    .then((res) => {
      if (!res.status) return alert(res.message);

      // 유저에 따라 다른 프로필 수정버튼 display
      const { user, same } = res.data;
      if (same) updateBtn.style = "display: block";
      drawUserInfo(user);
    })
    .catch((e) => alert(e.message));
})();

function drawUserInfo(user) {
  const { nickname, email, github, gender, tags, posts } = user;
  const checkedGithub = !github ? `깃허브 주소를 입력하지 않았습니다` : github;
  const fm = gender === "male" ? "남성" : "여성";
  addTextNode(document.querySelector(".page-title"), `${nickname}님의 프로필`);
  const field = document.getElementsByClassName("field");
  field.nickname.innerHTML += `<p class="data">${nickname}</p>`;
  field.email.innerHTML += `<p class="data">${email}</p>`;
  field.github.innerHTML += `<p class="data">${checkedGithub}</p>`;
  field.gender.innerHTML += `<p class="data">${fm}</p>`;

  Object.values(tags).forEach((tag) =>
    tagField.appendChild(makeSkillTag(tag.content, true, false)),
  );
  Object.values(posts).forEach((post) => {
    const title = post.title;
    const postId = post._id;
    postField.innerHTML += `<a class="data" href="/project/${postId}">${title}</a>`;
  });
}

// 업데이트 페이지로 버튼 이동 이벤트
updateBtn.addEventListener("click", () => (window.location = `/edit/user/${currentUserId}`));
// 반응형 헤더,푸터
responsiveHeader();

import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createEleClass, addTextNode } from "./components/utils.js";
import { getUserInfo } from "./api/dummy/index.js";

//DOM elements
const body = document.querySelector("body");
const header = makeHeader();
const footer = makeFooter();
const main = document.querySelector("#main");
const form = document.querySelector("#main section form");
const updateBtn = document.querySelector("#main section form #updateBtn");
updateBtn.style = "display:none";

// Header, footer append
body.insertBefore(header, main);
body.insertBefore(footer, document.querySelector("script"));

// 유저에 따라 다른 프로필 수정버튼 display

const pathname = window.location.pathname.split("/");
const currentUserId = pathname[pathname.length - 1];
console.log(currentUserId);

// get user data
const user = {};
// window.onload = fetch(`${currentUserId}`, { method: "GET" }).then((res) => {
//   if (!res.status) {
//     alert(res.message);
//     return;
//   }
//   if (res.data.same) {
//     updateBtn.style = "display:block";
//   }
//   user.nickname = res.user.nickname;
//   user.email = res.user.email;
//   user.gender = res.user.gender;
//   user.skill = res.user.tags;
//   user.github = res.user.github;
// });

// TODO : dummy data load 삭제
window.onload = (function () {
  const res = getUserInfo(currentUserId);
  if (!res.status) {
    alert(res.message);
    return;
  }
  updateBtn.style = "display: block";
  user.nickname = res.data.user.nickname;
  user.email = res.data.user.email;
  user.gender = res.data.user.gender;
  user.skill = res.data.user.tags;
  user.github = res.data.user.github;
})();

addTextNode(document.querySelector(".group-title"), `${user.nickname}님의 프로필`);

const field = [`nickname`, `email`, `gender`, `tags`, `github`];
const fieldname = [`닉네임`, `이메일`, `성별`, `기술스택`, `깃허브주소`];
// TODO : 기술 스택 태그 변경
const fieldNum = field.length;
for (let i = 0; i < fieldNum; i++) {
  const div = makeDataField(user[field[i]], fieldname[i]);
  form.insertBefore(div, updateBtn);
}

// 업데이트 페이지로 버튼 이동 이벤트
form.addEventListener("submit", () => {
  window.location = `/user/${user.id}/edit`;
});

// 데이터 필드 생성 함수
function makeDataField(userData, fieldname) {
  const dataField = createEleClass(`div`, `field`);
  const dataLabel = createEleClass(`p`, `label`);
  const _data = createEleClass(`p`, `data`);

  addTextNode(_data, userData);
  addTextNode(dataLabel, fieldname);

  dataField.appendChild(dataLabel);
  dataField.appendChild(_data);

  return dataField;
}

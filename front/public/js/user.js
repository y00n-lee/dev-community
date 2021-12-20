import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createEleId, createEleClass, addTextNode } from "./components/utils.js";

//DOM elements
const body = document.querySelector("body");
const header = makeHeader();
const footer = makeFooter();
const main = document.querySelector("#main");
const form = document.querySelector("#main section form");
const updateBtn = document.querySelector("#main section form #updateBtn");

// Header, footer append
body.insertBefore(header, main);
body.insertBefore(footer, document.querySelector("script"));

addTextNode(document.querySelector(".group-title"), "@@님의 프로필");

// dummy data
const user = {
  nickname: "helloworld",
  email: "hellohello@gggggg.com",
  gender: "남성",
  skill: ["자바스크립트", "노드js", "react", "vue", "mongodb"],
  github: "hellohello@github.com",
  id: "1",
};

const field = [`nickname`, `email`, `gender`, `skill`, `github`];
const fieldname = [`닉네임`, `이메일`, `성별`, `기술스택`, `깃허브주소`];
//수정할 사항 : 기술 스택은 p태그가 아닌 이미지나 다른 태그로 바꿔야 함.
const fieldNum = field.length;
for (let i = 0; i < fieldNum; i++) {
  const div = makeDataField(user[field[i]], fieldname[i]);
  form.insertBefore(div, updateBtn);
}

// 업데이트 페이지로 버튼 이동 이벤트
form.addEventListener("submit", updatePage);

function updatePage() {
  // form.setAttribute("action", `/edit/user/${id}`);
  window.location = `/edit/user/${user.id}`;
}

//데이터 필드 생성 함수
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

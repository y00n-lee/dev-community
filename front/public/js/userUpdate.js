import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
// User Function
// Create Element Id
function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);
  return ele;
}

// Create Elemen Class
function addEleClass(el, className) {
  const ele = document.createElement(`${el}`);
  ele.classList.add(`${className}`);

  return ele;
}

// Add textnode to element
function addTextNode(ele, text) {
  ele.appendChild(document.createTextNode(`${text}`));
}
//패스워드 필드 생성 함수
function makePwField() {
  return 0;
}
//데이터 필드 생성 함수
function makeDataField(userData, fieldname, url) {
  const dataField = addEleClass(`form`, `field`);
  dataField.setAttribute("method", "post");
  dataField.setAttribute("action", `${url}`);
  dataField.setAttribute("target", "iframe");
  const dataLabel = addEleClass(`p`, `label`);
  const _data = addEleClass(`input`, `data`);
  _data.setAttribute("value", userData);
  addTextNode(dataLabel, fieldname);

  dataField.appendChild(dataLabel);
  dataField.appendChild(_data);

  const updateBtn = addEleClass("input", "updateBtn");
  makeButton(updateBtn, "submit", "수정", "updateBtn");
  updateBtn.setAttribute("onclick", `btnSubmit()`);

  dataField.appendChild(updateBtn);

  return dataField;
}

//make button
function makeButton(ele, type, value, name) {
  ele.setAttribute("value", `${value}`);
  ele.setAttribute("type", `${type}`);
  ele.setAttribute("name", `${name}`);
}

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// Main
const main = createEleId("main", "main");

const grouptitle = addEleClass("p", "group-title");
addTextNode(grouptitle, "@@님의 프로필");

main.appendChild(grouptitle);
const section = addEleClass("section", "flex-container");

// dummy data
const user = {
  nickname: "helloworld",
  email: "hellohello@gggggg.com",
  gender: "남성",
  skill: ["자바스크립트", "노드js", "react", "vue", "mongodb"],
  github: "hellohello@github.com",
  id: "1",
};

const article = addEleClass("article", "flex-item");
const profileImg = addEleClass("img", "image"); // 회원 프로필 사진
profileImg.setAttribute("src", "../img/about/man1.png");
article.appendChild(profileImg);

const field = [
  // 유저 속성, 라벨, url
  ["nickname", "닉네임", "url1"],
  ["email", "이메일", "url2"],
  ["skill", "기술스택", "url3"],
];
for (let i = 0; i < field.length; i++) {
  article.appendChild(makeDataField(user[field[i][0]], field[i][1], field[i][2]));
}

const pwField = createEleId(`form`, `password`);
pwField.setAttribute("method", "post");
pwField.classList.add("field");
const pwName = [
  ["현재 비밀번호", "nowPw"],
  ["변경 비밀번호", "chPw"],
  ["비밀번호 확인", "ckPw"],
];
for (let i = 0; i < pwName.length; i++) {
  const pwLabel = addEleClass(`p`, `label`);
  addTextNode(pwLabel, pwName[i][0]);
  pwField.appendChild(pwLabel);
  const _data = addEleClass(`input`, `data`);
  _data.setAttribute("type", "password");
  _data.setAttribute("id", pwName[i][1]);
  pwField.appendChild(_data);
}

const updateBtn = addEleClass("input", "updateBtn");
makeButton(updateBtn, "submit", "변경", "updateBtn");
updateBtn.setAttribute("onclick", "confirmPw()");

pwField.appendChild(updateBtn);
article.appendChild(pwField);
section.appendChild(article);

main.appendChild(section);
container.appendChild(main);
const iframe = createEleId("iframe", "iframe");
iframe.setAttribute("name", "iframe");
iframe.setAttribute("style", "display:none");
container.appendChild(iframe);
// Footer
const footer = makeFooter();
container.appendChild(footer);
document.body.appendChild(container);

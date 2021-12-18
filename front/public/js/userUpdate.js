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
//데이터 필드 생성 함수
function makeDataField(fieldname, userData, addBtn) {
  const dataField = addEleClass(`div`, `field`);
  const dataLabel = addEleClass(`p`, `label`);
  const _data = addEleClass(`input`, `data`);
  // const _data = createEleId(`input`);
  // if (userData !== null)
  // addTextNode(_data, userData);
  console.log(userData);
  if (userData !== undefined) _data.setAttribute("value", userData);
  // _data.setAttribute("size", 50);
  addTextNode(dataLabel, fieldname);

  dataField.appendChild(dataLabel);
  dataField.appendChild(_data);

  if (addBtn) {
    const updateBtn = createEleId("input", "updateBtn");
    updateBtn.setAttribute("type", "button");
    updateBtn.setAttribute("name", "updateBtn");
    if (userData !== undefined) updateBtn.setAttribute("value", "수정");
    else updateBtn.setAttribute("value", "확인");
    dataField.appendChild(updateBtn);
  }
  // updateBtn.setAttribute("onclick", `updatePage(${user.id})`);

  return dataField;
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

const field = [`nickname`, `email`, `skill`, `pw`, `change-pw`, `check-pw`];
const fieldname = [
  `닉네임`,
  `이메일`,
  `기술스택`,
  `현재 비밀번호`,
  `변경 비밀번호`,
  `비밀번호 확인`,
];
for (let i = 0; i < field.length; i++) {
  // console.log(user[field[i]]);
  const addBtn = field[i] === "pw" || field[i] === `change-pw` ? false : true;
  article.appendChild(makeDataField(fieldname[i], user[field[i]], addBtn));
}
// Update Button
const updateBtn = createEleId("input", "updateBtn");
updateBtn.setAttribute("type", "button");
updateBtn.setAttribute("name", "updateBtn");
updateBtn.setAttribute("value", "프로필 수정");
updateBtn.setAttribute("onclick", `updatePage(${user.id})`);
article.appendChild(updateBtn);

section.appendChild(article);

main.appendChild(section);
container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);
document.body.appendChild(container);

// // 업데이트 버튼 이동 이벤트
// function updatePage(id) {
//   window.location = `/edit/user/${id}`;
// }
// <input id="updateBtn" type="button" name="updateBtn" value = "프로필수정">
// updateBtn.addEventListener('submit', updatePage(user.id))

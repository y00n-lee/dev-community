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
function makeDataField(userData, fieldname) {
  const dataField = addEleClass(`div`,`field`);
  const dataLabel = addEleClass(`p`, `label`);
  const _data = addEleClass(`p`,`data`);

  addTextNode(_data, userData);
  addTextNode(dataLabel, fieldname);

  dataField.appendChild(dataLabel);
  dataField.appendChild(_data);

  return dataField;
};

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// Main
const main = createEleId("main", "main");

const grouptitle = addEleClass("p","group-title");
addTextNode(grouptitle, '@@님의 프로필');

main.appendChild(grouptitle)
const section = addEleClass("section","flex-container");

// dummy data
const user = {
  nick : "helloworld",
  email : "hellohello@gggggg.com",
  gender : "남성",
  skill : ['자바스크립트', '노드js', 'react', 'vue', 'mongodb'],
  github : "hellohello@github.com",
};

const article = addEleClass("article","flex-item");
const profileImg = addEleClass("img","image"); // 회원 프로필 사진
profileImg.setAttribute("src", "../img/about/man1.png");
article.appendChild(profileImg);

const field = [`nickname`, `email`, `gender`, `skill`, `github`];
const fieldname = [`닉네임`,`이메일`,`성별`,`기술스택`,`깃허브주소`];
//수정할 사항 : 기술 스택은 p태그가 아닌 이미지나 다른 태그로 바꿔야 함.

const fieldNum = field.length;
for (let i=0; i<fieldNum; i++) {
  article.appendChild(
    makeDataField(
      user[field[i]],fieldname[i]
    )
  )
}

section.appendChild(article);
main.appendChild(section);
container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);
document.body.appendChild(container);



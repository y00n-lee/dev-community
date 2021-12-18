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

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// Main
const main = createEleId("main", "main");

const grouptitle = addEleClass("p","group-title");
addTextNode(grouptitle, '이 프로젝트 그룹 이름');

main.appendChild(grouptitle)
const section = addEleClass("section","flex-container"); //멤버 카드 여러개가 담길 element

// 각각의 멤버 카드 article로 생성
const memberCount = 5; //임의 설정
const stacks = ['자바스크립트', '노드js', 'react', 'vue', 'mongodb'];
// const intro = []
for (let i = 0; i<memberCount; i++) {
  const article = addEleClass("article","flex-item");
  const memberImg = addEleClass("img","image"); // 회원 프로필 사진
  const memberName = addEleClass("p", "member-name"); // 회원 이름
  const memberIntro = addEleClass("p", "introduce"); // 회원 소개말
  const memberSkill = addEleClass("p", "member-skill"); // 회원 기술 스택

  // 회원 데이터 불러오기
  memberImg.setAttribute("src", "../img/about/man1.png")
  addTextNode(memberName, "김병철")
  addTextNode(memberIntro, `안녕하세요, 잘 부탁드립니다~~!안녕하세요, 잘 부탁드립니다~~!`)
  addTextNode(memberSkill, stacks[i]);  
  article.appendChild(memberImg);
  article.appendChild(memberName);
  article.appendChild(memberIntro);
  article.appendChild(memberSkill);

  section.appendChild(article);
}
main.appendChild(section);

container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);
document.body.appendChild(container);


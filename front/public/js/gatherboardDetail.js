import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { makeComments } from "./components/comments.js";
// User Function
// Create Element Id
function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);

  return ele;
}

// Create Elemen Class
function addEleClass(el, classNames) {
  const ele = document.createElement(`${el}`);
  const classArray = classNames.split(" ");
  for (let i = 0; i < classArray.length; i++) {
    ele.classList.add(`${classArray[i]}`);
  }

  return ele;
}

// Make Button Function
function makeLinkButton(link, content) {
  const div = addEleClass("div", "btn_area");
  const btn = addEleClass("button", "btn");

  btn.setAttribute("onclick", `location.href='${link}'`);
  btn.appendChild(document.createTextNode(`${content}`));
  div.appendChild(btn);

  return div;
}

// dummy data
const gatherData = {
  emailId: "kisagge@naver.com",
  title: "프론트엔드 프로젝트 하실 분 구합니다!!",
  content: "React나 Spring 다룰 줄 아시는 분 구합니다. 가능하신 분은 연락주세요!!!",
  techStack: ["React", "Spring"],
  looks: 0,
  comments: [
    {
      cmt: "연락주세요",
      author: "Yuna Kim",
    },
    {
      cmt: "가능합니다!",
      author: "James",
    },
  ],
};

const user = {
  emailId: "kisagge@naver.com",
  nickname: "GgemKko",
};

const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// Main
const main = createEleId("main", "main");
const mainHeadName = createEleId("h2", "head");
mainHeadName.appendChild(document.createTextNode(`모집게시판`));
main.appendChild(mainHeadName);

const showGather = createEleId("div", "showGather");

// Gather Title
const gatherTitle = document.createElement("h3");
gatherTitle.appendChild(document.createTextNode("글 제목"));
showGather.appendChild(gatherTitle);

const gatherTitleSpan = addEleClass("span", "box");
gatherTitleSpan.appendChild(document.createTextNode(`${gatherData.title}`));
showGather.appendChild(gatherTitleSpan);

// Gather Content
const gatherContent = document.createElement("h3");
gatherContent.appendChild(document.createTextNode("내용"));
showGather.appendChild(gatherContent);

const gatherContentSpan = addEleClass("span", "contentBox");
gatherContentSpan.appendChild(document.createTextNode(`${gatherData.content}`));
showGather.appendChild(gatherContentSpan);

// Gather TechStack
const gatherTechStack = document.createElement("h3");
gatherTechStack.appendChild(document.createTextNode("기술 스택"));
showGather.appendChild(gatherTechStack);

const gatherTechStackSpan = addEleClass("span", "techStackBox");
for (let i = 0; i < gatherData.techStack.length; i++) {
  const techStackImg = document.createElement("p");
  techStackImg.appendChild(document.createTextNode(`${gatherData.techStack[i]}`));
  gatherTechStackSpan.appendChild(techStackImg);
}
showGather.appendChild(gatherTechStackSpan);

// Button
const updateDiv = makeLinkButton(``, "수정하기");
showGather.appendChild(updateDiv);

const gotoListDiv = makeLinkButton("/posts", "목록으로");
showGather.appendChild(gotoListDiv);

main.appendChild(showGather);

const commentDiv = makeComments(gatherData.comments, user);
main.appendChild(commentDiv);

container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);

document.body.appendChild(container);

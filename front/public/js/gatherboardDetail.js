import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { makeComments } from "./components/comments.js";
import { createEleId, createEleClass, addTextNode } from "./components/utils.js";
// User Function

// Make Button Function
function makeLinkButton(link, content) {
  const div = createEleClass("div", "btn_area");
  const btn = createEleClass("button", "btn");

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

const container = document.querySelector(".container");
// Header
const header = makeHeader();
container.prepend(header);
// Main
const main = document.getElementById("main");
// Gather Title
document.getElementById("gatherTitle").appendChild(document.createTextNode(`${gatherData.title}`));
// Gather Content
document
  .getElementById("gatherContent")
  .appendChild(document.createTextNode(`${gatherData.content}`));

// Gather TechStack
const gatherTechStackSpan = document.getElementById("gatherTechStack");
for (let i = 0; i < gatherData.techStack.length; i++) {
  const techStackImg = document.createElement("p");
  techStackImg.appendChild(document.createTextNode(`${gatherData.techStack[i]}`));
  gatherTechStackSpan.appendChild(techStackImg);
}

//Button
if (user.emailId == gatherData.emailId) {
  document.getElementById("update").style.display = "block";
  document.getElementById("participate").style.display = "none";
} else {
  document.getElementById("update").style.display = "none";
  document.getElementById("participate").style.display = "block";
}

makeComments(gatherData.comments, user);

//footer
const footer = makeFooter();
container.append(footer);

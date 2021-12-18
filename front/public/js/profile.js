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
addTextNode(grouptitle, '@@님의 프로필');

main.appendChild(grouptitle)
const section = addEleClass("section","flex-container");

const dummy = {
  nick : "helloworld",
  email : "hellohello@gggggg.com",
  gender : "남성",
  skill : ['자바스크립트', '노드js', 'react', 'vue', 'mongodb'],
  github : "hellohello@github.com",
};

const article = addEleClass("article","flex-item");
const profileImg = addEleClass("img","image"); // 회원 프로필 사진
profileImg.setAttribute("src", "../img/about/man1.png");

const nicknameField = addEleClass("div", "field"); 
const emailField = addEleClass("div", "field"); 
const genderField = addEleClass("div", "field"); 
const skillField = addEleClass("div", "field"); 
const githubField = addEleClass("div", "field"); 

const nicknameLabel = addEleClass("p", "label"); 
const emailLabel = addEleClass("p", "label"); 
const genderLabel = addEleClass("p", "label"); 
const skillLabel = addEleClass("p", "label"); 
const githubLabel = addEleClass("p", "label"); 

const nickname = addEleClass("p", "data"); 
const email = addEleClass("p", "data"); 
const gender = addEleClass("p", "data"); 
const skill = addEleClass("p", "data"); 
const github = addEleClass("p", "data"); 

addTextNode(nickname, dummy.nick);
addTextNode(email, dummy.email);
addTextNode(gender, dummy.gender); 
addTextNode(skill, dummy.skill); 
addTextNode(github, dummy.github);  

addTextNode(nicknameLabel, `닉네임`);
addTextNode(emailLabel, `이메일`);
addTextNode(genderLabel, `성별`); 
addTextNode(skillLabel, `기술스택`); 
addTextNode(githubLabel, `깃허브주소`);  

nicknameField.appendChild(nicknameLabel);
nicknameField.appendChild(nickname);
emailField.appendChild(emailLabel);
emailField.appendChild(email);
genderField.appendChild(genderLabel);
genderField.appendChild(gender);
skillField.appendChild(skillLabel);
skillField.appendChild(skill);
githubField.appendChild(githubLabel);
githubField.appendChild(github);

article.appendChild(profileImg);
article.appendChild(nicknameField);
article.appendChild(emailField);
article.appendChild(genderField);
article.appendChild(skillField);
article.appendChild(githubField);

section.appendChild(article);

main.appendChild(section);

container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);
document.body.appendChild(container);


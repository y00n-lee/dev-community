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
function addEleClass(el, classNames) {
  const ele = document.createElement(`${el}`);
  const classArray = classNames.split(" ");
  for (let i = 0; i < classArray.length; i++) {
    ele.classList.add(`${classArray[i]}`);
  }

  return ele;
}

// TechStack Checkbox
function techStackCheckBox(techStack) {
  const div = document.createElement("div");
  for (let i = 0; i < techStack.length; i++) {
    const checkInputLabel = document.createElement("label");
    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("name", "techStack");
    checkInput.setAttribute("value", `${techStack[i]}`);
    checkInputLabel.appendChild(checkInput);
    checkInputLabel.appendChild(document.createTextNode(`${techStack[i]}`));
    div.appendChild(checkInputLabel);
  }

  return div;
}

// make header + label
function makeHeadAndLabel(head, labelFor, content) {
  const Head = document.createElement(`${head}`);
  const headLabel = document.createElement("label");
  headLabel.setAttribute("for", `${labelFor}`);
  headLabel.appendChild(document.createTextNode(`${content}`));
  Head.appendChild(headLabel);

  return Head;
}

// Make Button Function
function makeLinkButton(link, content) {
  const div = addEleClass("div", "submit_area");
  const btn = addEleClass("button", "submit");

  btn.setAttribute("onclick", `location.href='${link}'`);
  btn.appendChild(document.createTextNode(`${content}`));
  div.appendChild(btn);

  return div;
}

// dummy data
const techStackData = ["HTML", "CSS", "JAVASCRIPT", "NODEJS", "SPRING", "EXPRESS", "REACT"];

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// Main
const main = createEleId("main", "main");
const mainHeadName = createEleId("h2", "head");
const section = createEleId("section", "makeBlock");
const form = document.createElement("form");

mainHeadName.appendChild(document.createTextNode(`모집게시판`));
// Form Setting
form.setAttribute("name", "gatherboardMake");
form.setAttribute("action", "/posts");
form.setAttribute("method", "post");

const formTitle = document.createElement("div");
const formTitleHead = makeHeadAndLabel("h3", "title", "글 제목");
formTitle.appendChild(formTitleHead);

const formTitleInputSpan = addEleClass("span", "box");
const formTitleInput = createEleId("input", "title");
formTitleInput.setAttribute("type", "text");
formTitleInput.setAttribute("name", "title");
formTitleInput.setAttribute("class", "int");
formTitleInput.setAttribute("maxlength", "40");
formTitleInput.setAttribute("required", "");
formTitleInputSpan.appendChild(formTitleInput);
formTitle.appendChild(formTitleInputSpan);

form.appendChild(formTitle);

const formContent = document.createElement("div");
const formContentHead = makeHeadAndLabel("h3", "contentText", "내용");
formContent.appendChild(formContentHead);

const formContentTextareaSpan = addEleClass("span", "textbox");
const formContentTextarea = createEleId("textarea", "content");
formContentTextarea.setAttribute("name", "contentText");
formContentTextarea.setAttribute("cols", "60");
formContentTextarea.setAttribute("rows", "20");
formContentTextarea.setAttribute("maxlength", "40");
formContentTextarea.setAttribute("required", "");
formContentTextareaSpan.appendChild(formContentTextarea);
formContent.appendChild(formContentTextareaSpan);

form.appendChild(formContent);

// TechStack
const formTechStack = document.createElement("div");
const formTechStackTitle = makeHeadAndLabel("h3", "techStack", "기술 스택");
formTechStack.appendChild(formTechStackTitle);

const techStackCheck = techStackCheckBox(techStackData);
formTechStack.appendChild(techStackCheck);

form.appendChild(formTechStack);

const formSubmitDiv = addEleClass("div", "submit_area");
const formSubmit = addEleClass("input", "submit");
formSubmit.setAttribute("type", "submit");
formSubmit.setAttribute("name", "submit");
formSubmit.setAttribute("value", "작성");
formSubmitDiv.appendChild(formSubmit);
form.appendChild(formSubmitDiv);

const formCancelDiv = makeLinkButton("/posts", "취소");
form.append(formCancelDiv);
// AppendChild Components - Main

section.appendChild(form);
main.appendChild(mainHeadName);
main.appendChild(section);
container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);

document.body.appendChild(container);

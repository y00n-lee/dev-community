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

// Add list member to component
// function addListandAfromArray(comp, params){
//     for(let i=0; i<params.length; i++){
//         comp.appendChild(`<li></li>`)
//     }
// }

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

// Form Setting
form.setAttribute("name", "freeBoardMake");
form.setAttribute("action", "");
form.setAttribute("method", "post");

mainHeadName.appendChild(document.createTextNode(`모집게시판`));

const formTitle = document.createElement("div");
const formTitleHead = document.createElement("h3");
const formTitleHeadLabel = document.createElement("label");
formTitleHeadLabel.setAttribute("for", "title");
formTitleHeadLabel.appendChild(document.createTextNode("글 제목"));
formTitleHead.appendChild(formTitleHeadLabel);
formTitle.appendChild(formTitleHeadLabel);

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
const formContentHead = document.createElement("h3");
const formContentHeadLabel = document.createElement("label");
formContentHeadLabel.setAttribute("for", "title");
formContentHeadLabel.appendChild(document.createTextNode("내용"));
formContentHead.appendChild(formContentHeadLabel);
formContent.appendChild(formContentHead);

const formContentTextareaSpan = addEleClass("span", "textbox");
const formContentTextarea = createEleId("textarea", "content");
formContentTextarea.setAttribute("name", "content");
formContentTextarea.setAttribute("cols", "60");
formContentTextarea.setAttribute("rows", "20");
formContentTextarea.setAttribute("maxlength", "40");
formContentTextarea.setAttribute("required", "");
formContentTextareaSpan.appendChild(formContentTextarea);
formContent.appendChild(formContentTextareaSpan);

form.appendChild(formContent);

const formSubmitCancel = document.createElement("div");
const formSubmit = createEleId("input", "submit");
formSubmit.setAttribute("type", "submit");
formSubmit.setAttribute("name", "submit");
formSubmit.setAttribute("value", "작성");
formSubmitCancel.appendChild(formSubmit);

const formCancel = document.createElement("button");
formCancel.appendChild(document.createTextNode("취소"));
formSubmitCancel.appendChild(formCancel);

form.append(formSubmitCancel);
form.innerHTML += `<div>
    <h3><label for="title">글 제목</label></h3>
</div>`;

// AppendChild Components - Main

section.appendChild(form);
main.appendChild(mainHeadName);
main.appendChild(section);
container.appendChild(main);

// Footer
const footer = makeFooter();

container.appendChild(footer);

document.body.appendChild(container);

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

//Header
const header = createEleId("header", "header");
const nav = addEleClass("nav", "navBar");
const slider = addEleClass("div", "slider");
const navMenu = addEleClass("ul", "navMenu");
const navLogin = addEleClass("ul", "navLogin");
const menu = addEleClass("div", "menu");

slider.innerHTML = `<input class="burger-check" type="checkbox" id="burger-check" />
<label class="burger-icon" for="burger-check">
<span class="burger-sticks"></span>
</label>`;

navMenu.innerHTML = `
    <li><a href="#">Logo</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">모집게시판</a></li>`;

navLogin.innerHTML = `<li class="login"><a href="#">Log In</a></li>
<li class="register"><a href="#">Register</a></li>`;

menu.innerHTML = `<div style="width: 200px;">
<a href="#">About</a>
<a href="#">모집게시판</a>
</div>`;

// AppendChild Components - Header
slider.appendChild(menu);
nav.appendChild(slider);
nav.appendChild(navMenu);
nav.appendChild(navLogin);
header.appendChild(nav);
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
const footer = createEleId("footer", "footer");
footer.appendChild(document.createTextNode("Footer 영역입니다."));

container.appendChild(footer);

document.body.appendChild(container);

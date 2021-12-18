import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";

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

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// 로그인
const section = addEleClass("section", "loginBox");
const form = createEleId("form", "loginForm");
form.setAttribute("action", "/signin"); // 추가해야함
form.setAttribute("method", "POST");

const h2 = document.createElement("h2");
h2.innerText = "Developer Post";

const idSpan = addEleClass("span", "user");
idSpan.innerHTML = "ID";

const idInput = addEleClass("input", "id");
idInput.setAttribute("type", "email");
idInput.setAttribute("name", "id");
idInput.setAttribute("placeholder", "아이디를 입력하세요.");

const passSpan = addEleClass("span", "user");
passSpan.innerText = "Password";

const passInput = addEleClass("input", "password");
passInput.setAttribute("type", "password");
passInput.setAttribute("name", "password");
passInput.setAttribute("placeholder", "비밀번호를 입력하세요.");

const searchBox = addEleClass("div", "search");
const search = document.createElement("a");
search.setAttribute("href", "/"); // ?
search.innerText = "계정/ 비밀번호 찾기";
searchBox.appendChild(search);

const loginButton = addEleClass("input", "submit");
loginButton.setAttribute("type", "submit");
loginButton.setAttribute("value", "로그인");

// CSS 적용이 안돼요...
const signupBox = addEleClass("div", "signbox");
const signSpan = document.createElement("span");
signSpan.innerText = "아직 회원이 아니신가요? ";
const signup = document.createElement("a");
signup.setAttribute("href", "/signup");
signup.innerText = "회원가입";
signupBox.appendChild(signSpan);
signupBox.appendChild(signup);

form.appendChild(h2);
form.appendChild(idSpan);
form.appendChild(idInput);
form.appendChild(passSpan);
form.appendChild(passInput);
form.appendChild(searchBox);
form.appendChild(loginButton);
form.appendChild(signupBox);
section.appendChild(form);
container.appendChild(section);

// Footer
const footer = makeFooter();

container.appendChild(footer);

document.body.appendChild(container);

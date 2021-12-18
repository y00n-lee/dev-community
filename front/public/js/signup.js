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

// make header + label
function makeHeadAndLabel(head, labelFor, content) {
  const Head = document.createElement(`${head}`);
  const headLabel = document.createElement("label");
  headLabel.setAttribute("for", `${labelFor}`);
  headLabel.appendChild(document.createTextNode(`${content}`));
  Head.appendChild(headLabel);

  return Head;
}

// make Signup Input Box
function makeSignupTextInputBox(id, classes, placeholder, maxlength) {
  const textInputBox = createEleId("input", `${id}`);
  textInputBox.setAttribute("type", "text");
  const classArray = classes.split(" ");
  for (let i = 0; i < classArray.length; i++) {
    textInputBox.classList.add(`${classArray[i]}`);
  }
  textInputBox.setAttribute("name", `${id}`);
  textInputBox.setAttribute("placeholder", `${placeholder}`);
  textInputBox.setAttribute("maxlength", `${maxlength}`);

  return textInputBox;
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

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// Sign up main
const main = createEleId("main", "main");
const signupHead = createEleId("h2", "signupHead");
signupHead.appendChild(document.createTextNode("회원가입"));
main.appendChild(signupHead);

const content = createEleId("content", "content");
const form = document.createElement("form");

// Form Setting
form.setAttribute("name", "signup");
form.setAttribute("action", "/");
form.setAttribute("method", "post");

// ID DIV
const idDiv = document.createElement("div");
const idDivHead = makeHeadAndLabel("h3", "emailId", "이메일");
const idDivInputBox = addEleClass("span", "box int_id");
const idDivInput = makeSignupTextInputBox("emailId", "int", "이메일 형식으로 입력해주세요.", "40");
idDivInputBox.appendChild(idDivInput);

idDiv.appendChild(idDivHead);
idDiv.appendChild(idDivInputBox);

idDiv.appendChild(addEleClass("span", "error_next_box"));

// const idCheckButton = createEleId("input", "id_check");
// idCheckButton.setAttribute("type", "button");
// idCheckButton.setAttribute("name", "id_check");
// idCheckButton.classList.add("btn");
// idCheckButton.setAttribute("value", "이메일 확인");
// idDiv.appendChild(idCheckButton);

form.appendChild(idDiv);

// NickName Div
const nickDiv = document.createElement("div");
const nickDivHead = makeHeadAndLabel("h3", "nickname", "닉네임");
const nickDivInputBox = addEleClass("span", "box int_nick");
const nickDivInput = makeSignupTextInputBox("nickname", "int", "닉네임을 입력해주세요.", "20");

nickDivInputBox.appendChild(nickDivInput);
nickDiv.appendChild(nickDivHead);
nickDiv.appendChild(nickDivInputBox);

nickDiv.appendChild(addEleClass("span", "error_next_box"));

form.appendChild(nickDiv);

// Password Div
const passwordDiv = document.createElement("div");
const passwordDivHead = makeHeadAndLabel("h3", "password", "비밀번호");
const passwordDivInputBox = addEleClass("span", "box int_pass");
const passwordDivInput = makeSignupTextInputBox("password", "int", "비밀번호", "20");
passwordDivInputBox.appendChild(passwordDivInput);
passwordDiv.appendChild(passwordDivHead);
passwordDiv.appendChild(passwordDivInputBox);
passwordDiv.appendChild(addEleClass("span", "error_next_box"));

form.appendChild(passwordDiv);

// Password Confirm Div
const passwordConfirmDiv = document.createElement("div");
const passwordConfirmDivHead = makeHeadAndLabel("h3", "password_confirm", "비밀번호 확인");
const passwordConfirmDivInputBox = addEleClass("span", "box int_pass");
const passwordConfirmDivInput = makeSignupTextInputBox(
  "password_confirm",
  "int",
  "비밀번호 확인",
  "20",
);
passwordConfirmDivInputBox.appendChild(passwordConfirmDivInput);
passwordConfirmDiv.appendChild(passwordConfirmDivHead);
passwordConfirmDiv.appendChild(passwordConfirmDivInputBox);
passwordConfirmDiv.appendChild(addEleClass("span", "error_next_box"));
form.appendChild(passwordConfirmDiv);

// Name Div
const nameDiv = document.createElement("div");
const nameDivHead = makeHeadAndLabel("h3", "name", "이름");
const nameDivInputBox = addEleClass("span", "box int_name");
const nameDivInput = makeSignupTextInputBox("name", "int", "이름을 입력해주세요.", "20");
nameDivInputBox.appendChild(nameDivInput);
nameDiv.appendChild(nameDivHead);
nameDiv.appendChild(nameDivInputBox);
nameDiv.appendChild(addEleClass("span", "error_next_box"));

form.appendChild(nameDiv);

// Birth Div
const birthDiv = document.createElement("div");
const birthDivHead = makeHeadAndLabel("h3", "birth", "생년월일");
const birthWrap = createEleId("div", "bir_wrap");

// Birth Year
const birthWrapYear = createEleId("div", "bir_yy");
const birthWrapYearInputBox = addEleClass("span", "box");
const birthWrapYearInput = makeSignupTextInputBox("yy", "int", "년(4자)", "4");
birthWrapYearInputBox.appendChild(birthWrapYearInput);
birthWrapYear.appendChild(birthWrapYearInputBox);
birthWrap.appendChild(birthWrapYear);

// Birth Month
const birthWrapMonth = createEleId("div", "bir_mm");
const birthWrapMonthInputBox = addEleClass("span", "box");
const birthWrapMonthInputBoxSelect = createEleId("select", "mm");
birthWrapMonthInputBoxSelect.setAttribute("name", "month");
const bitrhMonthDefault = document.createElement("option");
bitrhMonthDefault.appendChild(document.createTextNode("월"));
birthWrapMonthInputBoxSelect.appendChild(bitrhMonthDefault);

for (let i = 1; i < 13; i++) {
  const month = document.createElement("option");
  month.setAttribute("value", `${i}`);
  month.appendChild(document.createTextNode(`${i}`));
  birthWrapMonthInputBoxSelect.appendChild(month);
}

birthWrapMonthInputBox.appendChild(birthWrapMonthInputBoxSelect);
birthWrapMonth.appendChild(birthWrapMonthInputBox);
birthWrap.appendChild(birthWrapMonth);

// Birth Day
const birthWrapDay = createEleId("div", "bir_dd");
const birthWrapDayInputBox = addEleClass("span", "box");
const birthWrapDayInput = makeSignupTextInputBox("dd", "int", "일", "2");
birthWrapDayInputBox.appendChild(birthWrapDayInput);
birthWrapDay.appendChild(birthWrapDayInputBox);
birthWrap.appendChild(birthWrapDay);

birthDiv.appendChild(birthDivHead);
birthDiv.appendChild(birthWrap);
birthDiv.appendChild(addEleClass("span", "error_next_box"));

form.appendChild(birthDiv);

// Gender Div
const genderDiv = document.createElement("div");
const genderDivHead = makeHeadAndLabel("h3", "gender", "성별");
const genderInputBox = addEleClass("span", "box");
const genderInputBoxSelect = createEleId("select", "gender");
genderInputBoxSelect.setAttribute("name", "gender");
genderInputBoxSelect.innerHTML = `<option>성별</option>
<option value="M">남자</option>
<option value="F">여자</option>`;
genderInputBox.appendChild(genderInputBoxSelect);
genderDiv.appendChild(genderDivHead);
genderDiv.appendChild(genderInputBox);

const genderErr = addEleClass("span", "error_next_box");
genderErr.appendChild(document.createTextNode("필수 정보입니다."));
genderDiv.appendChild(genderErr);

form.appendChild(genderDiv);

// Submit Div
const submitDiv = addEleClass("div", "submit_area");
const submitInput = addEleClass("input", "submit");
submitInput.setAttribute("type", "submit");
submitInput.setAttribute("name", "submit");
submitInput.setAttribute("value", "가입하기");
submitDiv.appendChild(submitInput);
form.appendChild(submitDiv);

// Cancel Div
const cancelDiv = makeLinkButton("/", "취소");
form.appendChild(cancelDiv);
content.appendChild(form);
main.appendChild(content);
container.appendChild(main);
// Footer
const footer = makeFooter();
container.appendChild(footer);

document.body.appendChild(container);

// 유효성 검사
const id = document.querySelector("#emailId");
const nickname = document.querySelector("#nickname");
const pswd = document.querySelector("#password");
const pswdCf = document.querySelector("#password_confirm");
const userName = document.querySelector("#name");

const yy = document.querySelector("#yy");
const mm = document.querySelector("#mm");
const dd = document.querySelector("#dd");

const gender = document.querySelector("#gender");
const error = document.querySelectorAll(".error_next_box");

// Event Handler Connect
id.addEventListener("focusout", checkId);
nickname.addEventListener("focusout", checkNick);
pswd.addEventListener("focusout", checkPw);
pswdCf.addEventListener("focustout", comparePw);
userName.addEventListener("focusout", checkName);
yy.addEventListener("focusout", isBirthCompleted);
mm.addEventListener("focusout", isBirthCompleted);
dd.addEventListener("focusout", isBirthCompleted);
gender.addEventListener("focusout", function () {
  if (gender.value === "성별") {
    error[6].style.display = "block";
  } else {
    error[6].style.display = "none";
  }
});

// User function
function blockTagExtension(tag, inner) {
  tag.innerHTML = inner;
  tag.style.display = "block";
}

// Callback Function
function checkId() {
  if (id.value === "") {
    blockTagExtension(error[0], "필수 정보입니다.");
  } else {
    error[0].style.display = "none";
  }
}

function checkNick() {
  const nickPattern = /[a-zA-Z0-9_-]{5,20}/;

  if (nickname.value === "") {
    blockTagExtension(error[1], "필수 정보입니다.");
  } else if (!nickPattern.test(nickname.value)) {
    blockTagExtension(error[1], "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
  } else {
    error[1].innerHTML = "사용 가능한 닉네임입니다.";
    error[1].style.color = "#7979d3";
  }
}

function checkPw() {
  const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pswd.value === "") {
    blockTagExtension(error[2], "필수 정보입니다.");
  } else if (!pwPattern.test(pswd.value)) {
    blockTagExtension(error[2], "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
  } else {
    error[2].style.display = "none";
  }
}

function comparePw() {
  if (pswdCf.value === pswd.value && pswdCf.value != "") {
    error[3].style.display = "none";
  } else if (pswdCf.value !== pswd.value) {
    blockTagExtension(error[3], "비밀번호가 일치하지 않습니다.");
  }

  if (pswdCf.value === "") {
    blockTagExtension(error[3], "필수 정보입니다.");
  }
}

function checkName() {
  const namePattern = /[a-zA-Z가-힣]/;

  if (userName.value === "") {
    blockTagExtension(error[4], "필수 정보입니다.");
  } else if (!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
    blockTagExtension(error[4], "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)");
  } else {
    error[4].style.display = "none";
  }
}

function isBirthCompleted() {
  const yearPattern = /[0-9]{4}/;

  if (!yearPattern.test(yy.value)) {
    blockTagExtension(error[5], "태어난 년도 4자리를 정확하게 입력하세요.");
  } else {
    isMonthSelected();
  }

  function isMonthSelected() {
    if (mm.value === "월") {
      error[5].innerHTML = "태어난 월을 선택하세요.";
    } else {
      isDateCompleted();
    }
  }

  function isDateCompleted() {
    if (dd.value === "") {
      error[5].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
    } else {
      isBirthRight();
    }
  }
}

function isBirthRight() {
  const datePattern = /\d{1,2}/;
  if (!datePattern.test(dd.value) || Number(dd.value) < 1 || Number(dd.value) > 31) {
    error[5].innerHTML = "생년월일을 다시 확인해주세요.";
  } else {
    checkAge();
  }
}

function checkAge() {
  if (Number(yy.value) < 1920) {
    blockTagExtension(error[5], "정말이세요?");
  } else if (Number(yy.value) > 2020) {
    blockTagExtension(error[5], "미래에서 오셨군요. ^^");
  } else if (Number(yy.value) > 2005) {
    blockTagExtension(error[5], "만 14세 미만의 어린이는 보호자 동의가 필요합니다.");
  } else {
    error[5].style.display = "none";
  }
}

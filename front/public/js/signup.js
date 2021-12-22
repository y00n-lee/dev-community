import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { addTextNode } from "./components/utils.js";
//import { onSignup } from "./api/user/onSIgnup.js";
import { onSignup } from "./api/dummy/index.js";

const container = document.querySelector(".container");
const isOkArray = [false, false, false, false, false, false, false];

container.prepend(makeHeader());
//Body
for (let i = 1; i < 13; i++) {
  const month = document.createElement("option");
  month.setAttribute("value", `${i}`);
  addTextNode(month, `${i}`);
  document.getElementById("mm").appendChild(month);
}

function techStackCheckBox(techStack) {
  const div = document.getElementById("techStackBlock");
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
}

const techStackData = ["HTML", "CSS", "JAVASCRIPT", "NODEJS", "SPRING", "EXPRESS", "REACT"];

techStackCheckBox(techStackData);

document.getElementById("submit").addEventListener("click", function () {
  //유효성 검사
  if (!isOkArray[0]) {
    alert("이메일의 형식이 잘못되었습니다.");
  } else if (!isOkArray[1]) {
    alert("닉네임의 형식이 잘못되었습니다.");
  } else if (!isOkArray[2]) {
    alert("비밀번호를 확인하세요");
  } else if (!isOkArray[4]) {
    alert("이름의 형식이 잘못되었습니다.");
  } else if (!isOkArray[5]) {
    alert("생년월일이 잘못되었습니다.");
  } else if (!isOkArray[6]) {
    alert("성별을 확인하세요.");
  } else {
    const query = 'input[name="techStack"]:checked';
    const techStackCheck = document.querySelectorAll(query);
    const tagsList = [];
    techStackCheck.forEach((el) => {
      tagsList.push(el.value);
    });
    onSignup({
      email: document.getElementById("emailId").value,
      password: document.getElementById("password").value,
      nickname: document.getElementById("nickname").value,
      birth: new Date(
        Number(document.getElementById("yy").value),
        Number(document.getElementById("mm").value),
        Number(document.getElementById("dd").value),
      ),
      gender: document.getElementById("gender").value,
      tags: tagsList,
      //gitAdd: document.getElementById('gitAdd').value
    })
      .then((res) => {
        alert(res.message);
        if (res.status) window.location = "/signin";
      })
      .catch((e) => alert(e.message));
  }
});

document.getElementById("cancel").addEventListener("click", function () {
  window.location.href = "/";
});

container.append(makeFooter());
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
    isOkArray[6] = false;
  } else {
    error[6].style.display = "none";
    isOkArray[6] = true;
  }
});

// User function
function blockTagExtension(tag, inner) {
  tag.innerHTML = inner;
  tag.style.display = "block";
}

// Callback Function
function checkId() {
  const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (id.value === "") {
    blockTagExtension(error[0], "필수 정보입니다.");
    isOkArray[0] = false;
  } else if (emailPattern.test(id.value) === false) {
    blockTagExtension(error[0], "이메일 형식이 올바르지 않습니다.");
    isOkArray[0] = false;
  } else {
    error[0].style.display = "none";
    isOkArray[0] = true;
  }
}

function checkNick() {
  const nickPattern = /[a-zA-Z0-9_-]{5,20}/;

  if (nickname.value === "") {
    blockTagExtension(error[1], "필수 정보입니다.");
    isOkArray[1] = false;
  } else if (!nickPattern.test(nickname.value)) {
    blockTagExtension(error[1], "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
    isOkArray[1] = false;
  } else {
    error[1].innerHTML = "사용 가능한 닉네임입니다.";
    error[1].style.color = "#7979d3";
    isOkArray[1] = true;
  }
}

function checkPw() {
  const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pswd.value === "") {
    blockTagExtension(error[2], "필수 정보입니다.");
    isOkArray[2] = false;
  } else if (!pwPattern.test(pswd.value)) {
    blockTagExtension(error[2], "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
    isOkArray[2] = false;
  } else {
    error[2].style.display = "none";
    isOkArray[2] = true;
  }
}

function comparePw() {
  if (pswdCf.value === pswd.value && pswdCf.value != "") {
    console.log(1);
    error[3].style.display = "none";
    isOkArray[3] = true;
  } else if (pswdCf.value !== pswd.value) {
    console.log(2);
    blockTagExtension(error[3], "비밀번호가 일치하지 않습니다.");
    isOkArray[3] = false;
  }

  if (pswdCf.value === "") {
    console.log(3);
    blockTagExtension(error[3], "필수 정보입니다.");
    isOkArray[3] = false;
  }
}

function checkName() {
  const namePattern = /[a-zA-Z가-힣]/;

  if (userName.value === "") {
    blockTagExtension(error[4], "필수 정보입니다.");
    isOkArray[4] = false;
  } else if (!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
    blockTagExtension(error[4], "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)");
    isOkArray[4] = false;
  } else {
    error[4].style.display = "none";
    isOkArray[4] = true;
  }
}

function isBirthCompleted() {
  const yearPattern = /[0-9]{4}/;

  if (!yearPattern.test(yy.value)) {
    blockTagExtension(error[5], "태어난 년도 4자리를 정확하게 입력하세요.");
    isOkArray[5] = false;
  } else {
    isMonthSelected();
  }

  function isMonthSelected() {
    if (mm.value === "월") {
      error[5].innerHTML = "태어난 월을 선택하세요.";
      isOkArray[5] = false;
    } else {
      isDateCompleted();
    }
  }

  function isDateCompleted() {
    if (dd.value === "") {
      error[5].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
      isOkArray[5] = false;
    } else {
      isBirthRight();
    }
  }
}

function isBirthRight() {
  const datePattern = /\d{1,2}/;
  if (!datePattern.test(dd.value) || Number(dd.value) < 1 || Number(dd.value) > 31) {
    error[5].innerHTML = "생년월일을 다시 확인해주세요.";
    isOkArray[5] = false;
  } else {
    checkAge();
  }
}

function checkAge() {
  if (Number(yy.value) < 1920) {
    blockTagExtension(error[5], "정말이세요?");
    isOkArray[5] = false;
  } else if (Number(yy.value) > 2020) {
    blockTagExtension(error[5], "미래에서 오셨군요. ^^");
    isOkArray[5] = false;
  } else if (Number(yy.value) > 2005) {
    blockTagExtension(error[5], "만 14세 미만의 어린이는 보호자 동의가 필요합니다.");
    isOkArray[5] = false;
  } else {
    error[5].style.display = "none";
    isOkArray[5] = true;
  }
}

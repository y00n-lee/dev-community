import { makeHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { makeSkillTag, selectTag } from "../../components/tag.js";
import { removeChildsAll } from "../../components/utils.js";

import { onSignup } from "../../api/user/onSIgnup.js";

const container = document.querySelector(".container");
const isOkArray = [false, false, false, false, false, false];

const user = JSON.parse(sessionStorage.getItem("user"));

if (user) window.location = "/";

container.prepend(makeHeader());
//Body

const techStackData = [];

// TechStack Checkbox
function tagBox(techStack, inputId) {
  const div = document.getElementById("tagForm");
  techStack.forEach((el) => {
    div.appendChild(makeSkillTag(el, true, false));
  });
  div.innerHTML += `<span class="box">
  <input id="${inputId}" type="text" name="${inputId}" class="int" maxlength="40"/>
</span>`;
}

// Main
tagBox(techStackData, "techTag");

document.getElementById("tagForm").addEventListener("submit", function (event) {
  event.preventDefault();
  let techTagValue = document.getElementById("techTag").value;
  if (techTagValue) {
    techStackData.push(techTagValue);
    removeChildsAll(document.getElementById("tagForm"));
    tagBox(techStackData, "techTag");
  }
  document.getElementById("techTag").focus();
});

document.getElementById("submit").addEventListener("click", function () {
  //유효성 검사
  if (!isOkArray[0]) {
    alert("이메일의 형식이 잘못되었습니다.");
  } else if (!isOkArray[1]) {
    alert("닉네임의 형식이 잘못되었습니다.");
  } else if (!isOkArray[2]) {
    alert("비밀번호를 확인하세요");
  } else if (!isOkArray[3]) {
    alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
  } else if (!isOkArray[4]) {
    alert("생년월일이 잘못되었습니다.");
  } else if (!isOkArray[5]) {
    alert("성별을 확인하세요.");
  } else {
    const tagsList = selectTag();
    const birthValue = document.getElementById("birth").value;
    const year = birthValue.substring(0, 4);
    const month = birthValue.substring(4, 6);
    const day = birthValue.substring(6, 8);
    const newBirth = year + "-" + month + "-" + day;
    onSignup({
      email: document.getElementById("emailId").value,
      password: document.getElementById("password").value,
      nickname: document.getElementById("nickname").value,
      birth: new Date(newBirth),
      gender: document.getElementById("gender").value,
      tags: tagsList,
      github: document.getElementById("github").value,
    })
      .then((res) => {
        if (!res.status) alert(res.message);
        else {
          alert("회원가입 되셨습니다!");
          window.location = "/signin";
        }
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
const pswdCf = document.getElementById("password_confirm");

const birth = document.querySelector("#birth");

const gender = document.querySelector("#gender");
const error = document.querySelectorAll(".error_next_box");

// Event Handler Connect
id.addEventListener("focusout", checkId);
nickname.addEventListener("focusout", checkNick);
pswd.addEventListener("focusout", checkPw);
pswdCf.addEventListener("focusout", comparePw);
birth.addEventListener("focusout", checkBirth);
gender.addEventListener("focusout", function () {
  if (gender.value === "성별") {
    error[5].style.display = "block";
    isOkArray[5] = false;
  } else {
    error[5].style.display = "none";
    isOkArray[5] = true;
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
    error[3].style.display = "none";
    isOkArray[3] = true;
  } else if (pswdCf.value !== pswd.value) {
    blockTagExtension(error[3], "비밀번호가 일치하지 않습니다.");
    isOkArray[3] = false;
  }

  if (pswdCf.value === "") {
    blockTagExtension(error[3], "필수 정보입니다.");
    isOkArray[3] = false;
  }
}

function checkBirth() {
  const birthValue = birth.value;
  const year = Number(birthValue.substring(0, 4));
  const month = Number(birthValue.substring(4, 6));
  const day = Number(birthValue.substring(6, 8));
  const today = new Date();
  const yearNow = today.getFullYear();

  if (birthValue.length == 8) {
    if (year < 1900 || year > yearNow) {
      blockTagExtension(error[4], "생년월일을 정확하게 입력하세요.");
      isOkArray[4] = false;
    } else if (month < 1 || month > 12) {
      blockTagExtension(error[4], "생년월일을 정확하게 입력하세요.");
      isOkArray[4] = false;
    } else if (day < 1 || day > 31) {
      blockTagExtension(error[4], "생년월일을 정확하게 입력하세요.");
      isOkArray[4] = false;
    } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
      blockTagExtension(error[4], "생년월일을 정확하게 입력하세요.");
      isOkArray[4] = false;
    } else if (month == 2) {
      const isleap = year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
      if (day > 29 || (day == 29 && !isleap)) {
        blockTagExtension(error[4], "생년월일을 정확하게 입력하세요.");
        isOkArray[4] = false;
      } else {
        error[4].style.display = "none";
        isOkArray[4] = true;
      }
    } else {
      error[4].style.display = "none";
      isOkArray[4] = true;
    }
  } else {
    blockTagExtension(error[4], "생년월일을 정확하게 입력하세요.");
    isOkArray[4] = false;
  }
}

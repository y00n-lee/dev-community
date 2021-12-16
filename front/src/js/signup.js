let id = document.querySelector("#emailId");
let nickname = document.querySelector("#nickname");
let pswd = document.querySelector("#password");
let pswdCf = document.querySelector("#password_confirm");
let userName = document.querySelector("#name");

let yy = document.querySelector("#yy");
let mm = document.querySelector("#mm");
let dd = document.querySelector("#dd");

let gender = document.querySelector("#gender");
let error = document.querySelectorAll(".error_next_box");

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
    error[5].style.display = "block";
  } else {
    error[5].style.display = "none";
  }
});
// Callback Function
function checkId() {
  if (id.value === "") {
    error[0].innerHTML = "필수 정보입니다.";
    error[0].style.display = "block";
  } else {
    error[0].style.display = "none";
  }
}

function checkNick() {
  let nickPattern = /[a-zA-Z0-9_-]{5,20}/;

  if (nickname.value === "") {
    error[1].innerHTML = "필수 정보입니다.";
    error[1].style.display = "block";
  } else if (!nickPattern.test(nickname.value)) {
    error[1].innerHTML = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
    error[1].style.display = "block";
  } else {
    error[1].innerHTML = "사용 가능한 닉네임입니다.";
    error[1].style.color = "#7979d3";
  }
}

function checkPw() {
  let pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (pswd.value === "") {
    error[2].innerHTML = "필수 정보입니다.";
    error[2].style.display = "block";
  } else if (!pwPattern.test(pswd.value)) {
    error[2].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
    error[2].style.display = "block";
  } else {
    error[2].style.display = "none";
  }
}

function comparePw() {
  if (pswdCf.value === pswd.value && pswdCf.value != "") {
    error[3].style.display = "none";
  } else if (pswdCf.value !== pswd.value) {
    error[3].innerHTML = "비밀번호가 일치하지 않습니다.";
    error[3].style.display = "block";
  }

  if (pswdCf.value === "") {
    error[3].innerHTML = "필수 정보입니다.";
    error[3].style.display = "block";
  }
}

function checkName() {
  let namePattern = /[a-zA-Z가-힣]/;

  if (userName.value === "") {
    error[4].innerHTML = "필수 정보입니다.";
    error[4].style.display = "block";
  } else if (!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
    error[4].innerHTML = "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
    error[4].style.display = "block";
  } else {
    error[4].style.display = "none";
  }
}

function isBirthCompleted() {
  let yearPattern = /[0-9]{4}/;

  if (!yearPattern.test(yy.value)) {
    error[5].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
    error[5].style.display = "block";
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
  let datePattern = /\d{1,2}/;
  if (!datePattern.test(dd.value) || Number(dd.value) < 1 || Number(dd.value) > 31) {
    error[5].innerHTML = "생년월일을 다시 확인해주세요.";
  } else {
    checkAge();
  }
}

function checkAge() {
  if (Number(yy.value) < 1920) {
    error[5].innerHTML = "정말이세요?";
    error[5].style.display = "block";
  } else if (Number(yy.value) > 2020) {
    error[5].innerHTML = "미래에서 오셨군요. ^^";
    error[5].style.display = "block";
  } else if (Number(yy.value) > 2005) {
    error[5].innerHTML = "만 14세 미만의 어린이는 보호자 동의가 필요합니다.";
    error[5].style.display = "block";
  } else {
    error[5].style.display = "none";
  }
}

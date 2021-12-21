import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createEleClass, addTextNode } from "./components/utils.js";
import { getUserInfo } from "./api/dummy/index.js";
//DOM elements
const body = document.querySelector("body");
const header = makeHeader();
const footer = makeFooter();

const main = document.querySelector("#main");
const title = document.querySelector("#main .group-title");

const nameForm = document.getElementById("nickname");
const tagForm = document.getElementById("skilltag");

const nowPw = document.getElementById("nowPw");
const changePw = document.getElementById("changePw");
const checkPw = document.getElementById("checkPw");
const passwordBtn = document.getElementById("passwordBtn");

// Header, footer append
body.insertBefore(header, main);
body.insertBefore(footer, document.querySelector("script"));

const user = getUserInfo().data.user;
const pathname = window.location.pathname.split("/");
const currentUserId = pathname[pathname.length - 2];

//data load
// const user = {};
// window.onload = fetch(`${currentUserId}`, { method: "GET" }).then((res) => {
//   if (!res.status) {
//     alert(res.message);
//     return;
//   }
//   if (res.data.same) {
//     updateBtn.style = "display:block";
//   }
//   user.nickname = res.user.nickname;
//   user.gender = res.user.gender;
//   user.skill = res.user.tags;
//   user.github = res.user.github;
// });

addTextNode(title, `${user.nickname}님의 프로필`);

const filledData = [user.nickname, user.tags];
for (let i = 0; i < filledData.length; i++) {
  document.getElementsByName("filled")[i].placeholder = filledData[i];
}

// 수정버튼 이벤트 리스너
nameForm.addEventListener("submit", () => {
  const name = document.getElementById("name");
  fetch(`${currentUserId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname: `${name.value}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      name.placeholder = data;
      alert(`변경에 성공했습니다.`);
    });
});
tagForm.addEventListener("submit", () => {
  const tag = document.querySelectorAll("input[type='checkbox']");
  const checkedTag = document.querySelectorAll("input[type='checkbox']:checked");
  const taglabel = document.querySelectorAll("input[type='checkbox']:checked + label");
  let tagList = [];
  for (let i = 0; i < taglabel.length; i++) {
    tagList.append(`${taglabel[i].innerText}`);
  }
  fetch(`${currentUserId}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tags: tagList,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      tag.alert(`변경에 성공했습니다.`);
    });
});
//TODO : 각 수정 버튼 이벤트 리스너 달기
// nameField.addEventListener("submit", btnSubmit);
// function btnSubmit() {
//   // 정상적으로 업데이트
//   alert(this);
//   console.log(this);
//   // if (ele.value === "") {
//   //   alert("변경하려면 값을 입력하세요");
//   //   return;
//   // }
//   // alert(`변경에 성공했습니다`);
//   // 아니라면
//   // alert(` 변경에 실패했습니다`);
// }

//TODO : 유효성 검사
// function confirmPw() {
//   const nowPw = document.getElementById("nowPw").value;
//   const chPw = document.getElementById("chPw").value;
//   const ckPw = document.getElementById("ckPw").value;
//   const password = `12345`; // user password 값 가져와야 함
//   const pwField = document.getElementById("password");
//   pwField.setAttribute("target", "iframe");
//   if (nowPw !== password) alert("현재 비밀번호를 잘못입력했습니다");
//   else if (chPw !== ckPw) alert("비밀번호 확인이 틀렸습니다");
//   else {
//     if (checkPw(chPw)) {
//       alert(`비밀번호를 성공적으로 변경했습니다. 변경한 비밀번호로 다시 로그인해 주세요`);
//       const pwField = document.getElementById("password");
//       pwField.removeAttribute("target");
//       pwField.setAttribute("action", "../../signin");
//     } else alert("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
//   }
// }
// function checkPw(chPw) {
//   const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
//   if (chPw === "") return false;
//   else if (!pwPattern.test(chPw)) return false;

//   return true;
// }

// function checkNick() {
//   const nickPattern = /[a-zA-Z0-9_-]{5,20}/;

//   if (nickname.value === "") {
//     blockTagExtension(error[1], "필수 정보입니다.");
//   } else if (!nickPattern.test(nickname.value)) {
//     blockTagExtension(error[1], "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
//   } else {
//     error[1].innerHTML = "사용 가능한 닉네임입니다.";
//     error[1].style.color = "#7979d3";
//   }
// }

// function checkPw() {
//   const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
//   if (pswd.value === "") {
//     blockTagExtension(error[2], "필수 정보입니다.");
//   } else if (!pwPattern.test(pswd.value)) {
//     blockTagExtension(error[2], "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
//   } else {
//     error[2].style.display = "none";
//   }
// }

// function comparePw() {
//   if (pswdCf.value === pswd.value && pswdCf.value != "") {
//     error[3].style.display = "none";
//   } else if (pswdCf.value !== pswd.value) {
//     blockTagExtension(error[3], "비밀번호가 일치하지 않습니다.");
//   }

//   if (pswdCf.value === "") {
//     blockTagExtension(error[3], "필수 정보입니다.");
//   }
// }

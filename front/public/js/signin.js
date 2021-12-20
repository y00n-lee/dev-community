import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.appendChild(header);

// 로그인
const loginSection = document.querySelector(".loginBox");
container.appendChild(loginSection);

// 유효성 검사
// 아이디 비밀번호가 db와 일치하는지 체크 (일치하면 로그인)
// - 아이디가 db에 있고 비밀번호가 틀리다면 -> 비밀번호를 확인해주세요
// - 아이디가 db에 없다면 -> 가입된 정보가 없습니다.
const loginForm = document.querySelector("#loginForm");
const formEmail = document.getElementsByName("id")[0];
const formPassword = document.getElementsByName("password")[0];

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!formEmail.value || !formPassword.value) {
    alert("아이디와 비밀번호를 입력해주세요!");
  } else if (formPassword.value.length <= 8) {
    alert("비밀번호는 8자리 이상입니다.");
  } else {
    form.submit();
  }
});

// Footer
const footer = makeFooter();
container.appendChild(footer);

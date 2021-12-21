import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { onSignIn } from "./api/dummy/index.js";

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
const formEmail = document.querySelector(".loginId");
const formPassword = document.querySelector(".loginPassword");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!formEmail.value || !formPassword.value) {
    alert("아이디와 비밀번호를 입력해주세요!");
  } else if (formPassword.value.length <= 8) {
    alert("비밀번호는 8자리 이상입니다.");
  } else {
    onSignIn({ email: "sukho1007@naver.com", password: "1007" })
      .then((res) => {
        if (!res.status) alert(res.message);
        else window.location = "/";
      })
      .catch((e) => alert(e.message));
  }
});

// Footer
const footer = makeFooter();
container.appendChild(footer);

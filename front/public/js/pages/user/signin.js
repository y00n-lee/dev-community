import { makeHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { onSignIn } from "../../api/dummy/index.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// 로그인
const loginSection = document.querySelector(".loginBox");
container.appendChild(loginSection);

// 유효성 검사
const loginForm = document.querySelector("#loginForm");
const formEmail = document.querySelector(".loginId");
const formPassword = document.querySelector(".loginPassword");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!formEmail.value || !formPassword.value) {
    alert("아이디와 비밀번호를 입력해주세요!");
  } else if (formPassword.value.length < 8) {
    alert("비밀번호는 8자리 이상입니다.");
  } else {
    onSignIn({ email: formEmail.value, password: formPassword.value })
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

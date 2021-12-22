import { makeHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { resetPassword } from "../../api/dummy/index.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// 찾기
const searchSection = document.querySelector(".searchBox");
container.appendChild(searchSection);

// 유효성 검사
// 아이디 입력 여부
// - 아이디가 있다면 임시 비밀번호가 발송되었다는 메시지와 로그인창 이동
// - 아이디가 없다면 가입된 정보가 없습니다.
const searchForm = document.querySelector("#searchForm");
const formEmail = document.querySelector(".id");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = formEmail.value;

  if (!email) alert("아이디를 입력해주세요!");
  else
    resetPassword(email).then((res) => {
      alert(res.message);
      if (res.status) window.location = "/";
    });
});

// Footer
const footer = makeFooter();
container.appendChild(footer);

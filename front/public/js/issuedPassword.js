import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.appendChild(header);

// 찾기
const searchSection = document.querySelector(".searchBox");
container.appendChild(searchSection);

// 유효성 검사
// 아이디 입력 여부
// - 아이디가 있다면 임시 비밀번호가 발송되었다는 메시지와 로그인창 이동
// - 아이디가 없다면 가입된 정보가 없습니다.
const searchBtn = document.querySelector(".submit");

searchBtn.addEventListener("click", () => {
  alert("임시 비밀번호가 발송되었습니다!");
  window.location = "/signin";
});

// const searchForm = document.querySelector("#searchForm");
// const formEmail = document.getElementsByName("id")[0];

// searchForm.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   if (!formEmail.value) {
//     alert("아이디를 입력해주세요!");
//   } else {
//     searchForm.submit();
//     window.location = "/signin";
//   }
// });

// Footer
const footer = makeFooter();
container.appendChild(footer);

import { makeHeader } from "../components/header.js";
import { makeFooter } from "../components/footer.js";
import { editUserInfo, getUserInfo, inSignout } from "../api/dummy/index.js";
import { makeSkillTag } from "../components/tag.js";
import { removeChildsAll, isNull } from "../components/utils.js";
import { changePassword } from "../api/user/changePassword.js";

//DOM elements
const container = document.getElementsByClassName("container")[0];
const header = makeHeader();
const footer = makeFooter();
const main = document.getElementById("main");
const nameForm = document.getElementById("nicknameForm");
const tagForm = document.getElementById("tagForm");
const passwordForm = document.getElementById("passwordForm");
const p = `<p class="label">기술스택</p>`;

// Header, footer append
container.insertBefore(header, main);
container.appendChild(footer);

const pathname = window.location.pathname.split("/");
const currentUserId = pathname[pathname.length - 1];

// page onload
window.onload = setUpdateData();

// display user nickname, tags
function setUpdateData() {
  getUserInfo(currentUserId)
    .then((res) => {
      if (!res.status) return alert(res.message);

      const { nickname, tags } = res.data.user;
      const name = document.getElementById("nicknameValue");
      console.log(nickname);
      name.value = nickname;

      removeChildsAll(tagForm);
      tagForm.innerHTML = p;
      for (let i = 0; i < tags.length; i++) tagForm.appendChild(makeSkillTag(tags[i]));
    })
    .catch((e) => alert(e.message));
}

nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  btnSubmit("nickname");
});

tagForm.addEventListener("submit", (e) => {
  e.preventDefault();
  btnSubmit("tags");
});
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  confirmPassword();
});

// nickname, tags 변경 이벤트 함수
function btnSubmit(queryname) {
  if (queryname === "nickname") {
    const nickname = document.getElementById("nicknameValue").value;
    editUserInfo(currentUserId, nickname, `${queryname}`)
      .then((res) => {
        if (res.status) {
          alert(res.message);
          setUpdateData();
        }
      })
      .catch((e) => alert(e.message));
  } else {
    const tags = document.querySelectorAll(`.tag`);
    const tagList = [];
    tags.forEach((ele) => {
      if (ele.firstChild.cheked) tagList.push(ele.innerText);
    });
    editUserInfo(currentUserId, tagList, "tags")
      .then((res) => {
        if (res.status) {
          alert(res.message);
          setUpdateData();
        }
      })
      .catch((e) => alert(e.message));
  }
}

// 비밀번호 확인 함수
function confirmPassword() {
  const currPw = document.getElementById("currPw").value;
  const changePw = document.getElementById("changePw").value;
  const checkPw = document.getElementById("checkPw").value;
  // TODO : 빈 값 체크 함수로 변경
  if (isNull([currPw, changePw, checkPw]))
    return alert("현재 비밀번호, 변경 비밀번호, 비밀번호 확인을 모두 입력해주세요!");

  if (changePw !== checkPw) return alert("변경할 비밀번호와 비밀번호 확인이 다릅니다");
  if (validationPw(checkPw)) {
    // TODO : changePassword 함수 동작 확인
    changePassword({ currentPassword: `${currPw}`, password: `${checkPw}` })
      .then((res) => {
        if (res.status) {
          alert(res.message);
        }
      })
      .catch((e) => alert(e.message));
    inSignout()
      .then((res) => {
        if (res.status) alert(res.message);
      })
      .then((e) => e.message);
  } else return alert("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
}

// 비밀번호 유효성 검사 함수
function validationPw(checkPw) {
  const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (checkPw === "") return false;
  else if (!pwPattern.test(checkPw)) return false;
  return true;
}

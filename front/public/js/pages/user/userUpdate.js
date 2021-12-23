import { makeHeader, responsiveHeader } from "../../components/header.js";
import { makeFooter, responsiveFooter } from "../../components/footer.js";
import { makeSkillTag, selectTag, toggleTag } from "../../components/tag.js";
import { isNull } from "../../components/utils.js";

import { getUserInfo } from "../../api/user/getUserInfo.js";
import { editUserInfo } from "../../api/user/editUserInfo.js";
import { changePassword } from "../../api/user/changePassword.js";
import { onSignout } from "../../api/auth/onSignout.js";

//DOM elements
const container = document.getElementsByClassName("container")[0];
const header = makeHeader();
const footer = makeFooter();
const main = document.getElementById("main");
const nameForm = document.getElementById("nicknameForm");
const tagForm = document.getElementById("tagForm");
const tagField = document.getElementById("tagField");
const tagBtn = document.getElementById("tagBtn");
const passwordForm = document.getElementById("passwordForm");
const title = document.getElementsByClassName("page-title")[0];

// Header, footer append
container.insertBefore(header, main);
container.appendChild(footer);

const pathname = window.location.pathname.split("/");
const currentUserId = pathname[pathname.length - 1];

// page onload
window.onload = setUpdateData();

// display user nickname, tags
function setUpdateData() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    alert("로그인 시에만 수정하실 수 있습니다");
    window.location = "/";
  }
  getUserInfo(currentUserId)
    .then((res) => {
      if (!res.status) return alert(res.message);

      const { nickname, tags } = res.data.user;
      const name = document.getElementById("nicknameValue");
      name.value = nickname;
      title.innerText = `${nickname}님의 프로필`;

      for (let i = 0; i < tags.length; i++) {
        const tag = makeSkillTag(tags[i].content, true, true);
        tagField.appendChild(tag);
        tag.addEventListener("click", toggleTag);
      }
    })
    .catch((e) => alert(e.message));
}

// Event Listener
nameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nickname = document.getElementById("nicknameValue").value.replace(/^\s+|\s+$/gm, "");
  if (!nickname) return alert("빈 값을 입력하셨습니다.");
  btnSubmit("nickname", nickname);
});

// 기술 태그 창에 값 입력 후 엔터 시 이벤트 리스너
tagForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const tagValue = document.getElementById("tagValue").value.replace(/^\s+|\s+$/gm, "");
  if (!tagValue) return;
  const tag = makeSkillTag(tagValue, true, true);
  tagField.appendChild(tag);
  tagValue.value = "";
  tagValue.focus();
});

// 기술 태그 수정 버튼 눌렀을 때의 이벤트 리스너
tagBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const tagList = selectTag();
  btnSubmit("tags", tagList);
});
passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  confirmPassword();
});
// nickname, tags 변경 이벤트 함수
function btnSubmit(queryname, data) {
  editUserInfo(currentUserId, data, queryname)
    .then((res) => {
      if (res.status) {
        alert(res.message);
        window.location.reload();
      }
    })
    .catch((e) => alert(e.message));
}

// 비밀번호 확인 함수
function confirmPassword() {
  const currPw = document.getElementById("currPw").value;
  const changePw = document.getElementById("changePw").value;
  const checkPw = document.getElementById("checkPw").value;

  if (isNull([currPw, changePw, checkPw]))
    return alert("현재 비밀번호, 변경 비밀번호, 비밀번호 확인을 모두 입력해주세요!");

  if (changePw !== checkPw) return alert("변경할 비밀번호와 비밀번호 확인이 다릅니다");
  if (validationPw(checkPw)) {
    changePassword({ currentPassword: `${currPw}`, password: `${checkPw}` })
      .then((res) => {
        alert(res.message);
        if (res.status) return onSignout();
      })
      .then((res) => {
        if (res.status) window.location = "/";
        else alert(res.message);
      })
      .catch((e) => alert(e.message));
  } else return alert("8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.");
}

// 비밀번호 유효성 검사 함수
function validationPw(checkPw) {
  const pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
  if (checkPw === "") return false;
  else if (!pwPattern.test(checkPw)) return false;
  return true;
}

// 반응형 헤더,푸터
responsiveFooter();
responsiveHeader();

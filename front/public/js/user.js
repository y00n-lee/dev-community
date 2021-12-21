import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createEleClass, addTextNode } from "./components/utils.js";
import { getUserInfo } from "./api/dummy/index.js";
//DOM elements
const body = document.querySelector("body");
const header = makeHeader();
const footer = makeFooter();
const main = document.querySelector("#main");
const form = document.querySelector("#main section form");
const updateBtn = document.querySelector("#main section form #updateBtn");
updateBtn.style = "display:none";

// Header, footer append
body.insertBefore(header, main);
body.insertBefore(footer, document.querySelector("script"));

const pathname = window.location.pathname.split("/");
const currentUserId = pathname[pathname.length - 1];

// get user data
window.onload = (function () {
  getUserInfo(currentUserId)
    .then((res) => {
      if (!res.status) return alert(res.message);

      // 유저에 따라 다른 프로필 수정버튼 display
      const { user, same } = res.data;
      if (same) updateBtn.style = "display: block";
      makeUserInfo(user);
    })
    .catch((e) => alert(e.message));
})();

function makeUserInfo(user) {
  addTextNode(document.querySelector(".group-title"), `${user.nickname}님의 프로필`);

  const field = [`nickname`, `email`, `gender`];
  const fieldname = [`닉네임`, `이메일`, `성별`];

  const fieldNum = field.length;
  for (let i = 0; i < fieldNum; i++) {
    const div = makeDataField(user[field[i]], fieldname[i]);
    form.insertBefore(div, updateBtn);
  }
  const tagList = makeDataField(user.tags, `기술스택`, false);
  const postList = makeDataField(user.posts, `현재 참여한 스터디`, true);
  form.insertBefore(tagList, updateBtn);
  form.insertBefore(postList, updateBtn);
  // 업데이트 페이지로 버튼 이동 이벤트
  form.addEventListener("submit", () => {
    window.location = `/user/${user.id}/edit`;
  });
}

// 데이터 필드 생성 함수
function makeDataField(userData, fieldname, aTag) {
  const dataField = createEleClass(`div`, `field`);
  const dataLabel = createEleClass(`p`, `label`);
  addTextNode(dataLabel, fieldname);
  dataField.appendChild(dataLabel);
  console.log(typeof userData);
  if (typeof userData === "string") {
    const _data = createEleClass(`p`, `data`);
    addTextNode(_data, userData);
    dataField.appendChild(_data);
    return dataField;
  }

  if (!userData.length) {
    const _data = createEleClass(`p`, `data`);
    addTextNode(_data, aTag ? "아직 참여한 스터디가 없습니다" : "기술 스택을 선택하지 않았습니다");
    dataField.appendChild(_data);
    return dataField;
  }

  const dataList = makeListField(userData, aTag);
  dataField.appendChild(dataList);
  return dataField;
}
// 배열 값을 가진 데이터필드 생성 함수
function makeListField(userData, aTag) {
  const dataList = document.createElement("div");
  if (aTag) {
    for (let i = 0; i < userData.length; i++) {
      const _data = createEleClass(`a`, `data`);
      // TODO : url 변경
      _data.setAttribute("href", `http://localhost:3000/posts/${userData[i].id}`);
      _data.innerText = userData[i].title;
      dataList.appendChild(_data);
    }
    return dataList;
  }
  for (let i = 0; i < userData.length; i++) {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" checked disabled style="display:none"/>${userData[i]}`;
    dataList.appendChild(label);
  }
  return dataList;
}

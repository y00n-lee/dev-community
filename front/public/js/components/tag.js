import { isNull } from "./utils.js";

// 태그를 만드는 함수
export function makeSkillTag(data, select, toggle) {
  const span = document.createElement("span");
  select = isNull([select]) ? "" : "select";
  toggle = isNull([toggle]) ? "" : "toggle";
  span.innerHTML = `<input class="tag" type="checkbox" checked style="display:none"><span class="tagName ${select} ${toggle}">${data}</span>`;
  return span;
}

// 태그 토글 함수
export function toggleTag() {
  const input = this.querySelector(".tag");
  const span = this.querySelector(".toggle");
  if (!span) return;

  input.checked = !input.checked;
  if (input.checked) {
    span.classList.add("select");
  } else {
    span.classList.remove("select");
  }
}

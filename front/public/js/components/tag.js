// 태그를 만드는 함수
export function makeSkillTag(data, toggle) {
  const span = document.createElement("span");
  if (toggle)
    span.innerHTML = `<input class="tag" type="checkbox" checked style="display:none"><span class="tagName select">${data}</span>`;
  else
    span.innerHTML = `<input class="tag" type="checkbox" checked disabled style="display:none"><span class="tagName select">${data}</span>`;
  return span;
}

// 태그 토글 함수
export function toggleTag() {
  const input = this.querySelector(".tag");
  const span = this.querySelector(".tagName");
  console.log(input.checked);
  input.checked = !input.checked;
  if (input.checked) {
    span.classList.add("select");
  } else {
    span.classList.remove("select");
  }
  console.log(input.checked);
}

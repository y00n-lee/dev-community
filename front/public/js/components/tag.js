// 태그를 만드는 함수
export function makeSkillTag(data) {
  const label = document.createElement("label");
  label.innerHTML = `<input type="checkbox" checked disabled style="display:none"/>${data}`;
  return label;
}

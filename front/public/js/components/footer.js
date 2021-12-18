export function makeFooter() {
  const footer = document.createElement(`footer`);
  footer.setAttribute("id", `footer`);
  footer.appendChild(document.createTextNode("Footer 영역입니다."));

  return footer;
}

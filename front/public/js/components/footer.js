export function makeFooter() {
  const footer = document.createElement(`footer`);
  footer.setAttribute("id", `footer`);

  const footerInner = document.createElement("div");
  footerInner.appendChild(document.createTextNode("Footer 영역입니다."));
  footer.appendChild(footerInner);

  return footer;
}

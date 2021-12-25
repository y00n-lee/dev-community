export function makeFooter() {
  const footer = document.createElement(`footer`);
  footer.setAttribute("id", `footer`);

  const footerInner = document.createElement("div");
  footerInner.innerHTML = `<span style="color:lightgray;text-align:center"><img src="/img/footerLogo.png" alt="logo" style="height:18px; display:inline;">은 개발자 모임의 줄임말 입니다<br>프로젝트 제작 기간:2021.12.14 ~ 2021.12.25</span>`;
  // document.createElement("div");
  // footerInner.appendChild(document.createTextNode("Footer 영역입니다."));
  footer.appendChild(footerInner);

  return footer;
}

export function responsiveFooter() {
  window.onload = footerPosition;
  window.onresize = footerPosition;
}

export function footerPosition() {
  const footer = document.getElementById("footer").style;
  const height = document.getElementsByClassName("container")[0].offsetHeight;

  if (window.innerHeight <= height) {
    footer.position = "relative";
  } else {
    footer.position = "fixed";
  }
}

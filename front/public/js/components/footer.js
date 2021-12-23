export function makeFooter() {
  const footer = document.createElement(`footer`);
  footer.setAttribute("id", `footer`);

  const footerInner = document.createElement("div");
  footerInner.appendChild(document.createTextNode("Footer 영역입니다."));
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

  console.log(footer.position);
  if (window.innerHeight <= height) footer.position = "relative";
  else {
    footer.position = "fixed";
    footer.bottom = "0";
    footer.left = "0";
    footer.right = "0";
  }
}

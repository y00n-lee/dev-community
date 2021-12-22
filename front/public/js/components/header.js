import { createEleId, createEleClass } from "./utils.js";
//import { onSignin } from "../api/user/onSignin.js";
import { onSignIn, inSignout } from "../api/dummy/index.js";

export function makeHeader() {
  const header = createEleId("header", "header");
  const nav = createEleClass("nav", "navBar");
  const slider = createEleClass("div", "slider");
  const navMenu = createEleClass("ul", "navMenu");
  const navLogin = createEleClass("ul", "navLogin");
  const menu = createEleClass("div", "menu");

  slider.innerHTML = `<input class="burger-check" type="checkbox" id="burger-check" />
<label class="burger-icon" for="burger-check">
<span class="burger-sticks"></span>
</label>`;

  navMenu.innerHTML = `
    <li><a href="/">Logo</a></li>
    <li><a href="/posts">모집게시판</a></li>`;

  navLogin.innerHTML = `<li class="login"><a href="/signin">Log In</a></li>
<li class="register"><a href="signup">Register</a></li>`;

  menu.innerHTML = `<div style="width: 200px;">
<a href="/posts">모집게시판</a>
</div>`;

  onSignIn({ email: "sukho1007@naver.com", password: "1007" }).then((res) => {
    if (!res.status) {
      navLogin.innerHTML = `<li class="login"><a href="/signin">Log In</a></li><li class="register"><a href="signup">Register</a></li>`;
    } else {
      const user = res.data.user;

      navLogin.innerHTML = `<li class="login"><a href="/user/${user.id}">${user.nickname}<a>
    <li class="register"><a href="signup">Log Out</a></li>`;

      const logoutBox = document.querySelector(".register");
      logoutBox.addEventListener("click", (e) => {
        e.preventDefault();

        inSignout().then((resp) => {
          if (!resp.status) alert(resp.message);
          else window.location = "/";
        });
      });
    }
  });
  // AppendChild Components - Header
  slider.appendChild(menu);
  nav.appendChild(slider);
  nav.appendChild(navMenu);
  nav.appendChild(navLogin);
  header.appendChild(nav);

  return header;
}

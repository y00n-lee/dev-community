import { createEleId, createEleClass } from "./utils.js";
import { checkSignin } from "../api/user/checkSignin.js";
import { onSignout } from "../api/auth/onSignout.js";
import { checkExpirationToken } from "../api/auth/refreshToken.js";

export function makeHeader() {
  const header = createEleId("header", "header");
  const navBar = createEleClass("nav", "navBar");
  const slider = createEleClass("div", "slider");
  const navMenu = createEleClass("ul", "navMenu");
  const navLogin = createEleClass("ul", "navLogin");
  const menu = createEleClass("div", "menu");
  const overlay = createEleId("div", "overlay");
  slider.innerHTML = `
    <input class="burger-check" type="checkbox" id="burger-check"/>
    <label class="burger-icon" for="burger-check">
      <span class="burger-sticks"></span>
    </label>`;

  navMenu.innerHTML = `
    <li><a href="/"><img src="/img/headerLogo.png" alt="logo" style = "height:20px"></a></li>
    <li><a href="/posts">모집게시판</a></li>`;

  menu.innerHTML = `
    <div style="width: 200px;">
      <a style="display:hidden; padding:30px;"></a>
      <a href="/posts">모집게시판</a>
    </div>`;

  checkExpirationToken()
    .then(() => checkSignin())
    .then((res) => {
      if (!res.status) {
        sessionStorage.removeItem("user");
        navLogin.innerHTML = `
      <li class="login"><a href="/signin">Log In</a></li>
      <li class="register"><a href="/signup">Register</a></li>`;
      } else {
        const user = res.data;

        sessionStorage.setItem("user", JSON.stringify({ _id: user.id, ninkname: user.nickname }));

        navLogin.innerHTML = `
      <li class="login">
        <a href="/user/${user.id}">${user.nickname}<a>
      </li>
      <li class="register">
        <a>Log Out</a>
      </li>`;

        const logoutBox = document.querySelector(".register");
        logoutBox.addEventListener("click", (e) => {
          e.preventDefault();

          onSignout().then((resp) => {
            if (!resp.status) alert(resp.message);
            else {
              sessionStorage.removeItem("user");
              window.location = "/";
            }
          });
        });
      }
    });

  // AppendChild Components - Header
  slider.appendChild(menu);
  navBar.appendChild(overlay);
  navBar.appendChild(slider);
  navBar.appendChild(navMenu);
  navBar.appendChild(navLogin);
  header.appendChild(navBar);
  return header;
}
// responsive header
export function responsiveHeader() {
  document.getElementById("burger-check").addEventListener("click", () => {
    const checked = document.getElementById("burger-check").checked;
    const bodyStyle = document.body.style;
    if (checked) {
      document.getElementById("overlay").style.display = "block";
      bodyStyle.height = "100%";
      bodyStyle.overflow = "hidden";
    } else {
      document.getElementById("overlay").style.display = "none";
      bodyStyle.height = "auto";
      bodyStyle.overflow = "auto";
    }
  });
}

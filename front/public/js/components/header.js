// Create Element Id
function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);

  return ele;
}

// Create Elemen Class
function addEleClass(el, className) {
  const ele = document.createElement(`${el}`);
  ele.classList.add(`${className}`);

  return ele;
}

export function makeHeader() {
  const header = createEleId("header", "header");
  const nav = addEleClass("nav", "navBar");
  const slider = addEleClass("div", "slider");
  const navMenu = addEleClass("ul", "navMenu");
  const navLogin = addEleClass("ul", "navLogin");
  const menu = addEleClass("div", "menu");

  slider.innerHTML = `<input class="burger-check" type="checkbox" id="burger-check" />
<label class="burger-icon" for="burger-check">
<span class="burger-sticks"></span>
</label>`;

  navMenu.innerHTML = `
    <li><a href="/">Logo</a></li>
    <li><a href="#">About</a></li>
    <li><a href="/posts">모집게시판</a></li>`;

  navLogin.innerHTML = `<li class="login"><a href="/signin">Log In</a></li>
<li class="register"><a href="signup">Register</a></li>`;

  menu.innerHTML = `<div style="width: 200px;">
<a href="#">About</a>
<a href="#">모집게시판</a>
</div>`;

  // AppendChild Components - Header
  slider.appendChild(menu);
  nav.appendChild(slider);
  nav.appendChild(navMenu);
  nav.appendChild(navLogin);
  header.appendChild(nav);

  return header;
}

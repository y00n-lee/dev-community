import { makeHeader } from "../components/header.js";
import { makeFooter } from "../components/footer.js";
import { getRecentPostList } from "../components/postList.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// 최신글 6개
const main = document.querySelector(".main");
getRecentPostList.then((res) => {
  main.appendChild(res);
});

// Footer
const footer = makeFooter();
container.appendChild(footer);

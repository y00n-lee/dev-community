import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createPostCard } from "./components/postList.js";

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// 리스트 6개
const main = document.querySelector(".main");
const postList = createPostCard();
main.appendChild(postList);

// Footer
const footer = makeFooter();
container.appendChild(footer);

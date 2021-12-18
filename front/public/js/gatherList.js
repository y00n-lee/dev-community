import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { createPostCard } from "./components/postList.js";

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

// // 통신으로 넘어올 데이터? (최신글이 밑으로 추가될것같음)
// const data = [
//   {
//     title: "찾습니다.",
//     author: "철수",
//     stacks: ["html", "css", "js"],
//     content: "어쩌구저쩌구 이런 사람을 찾아요!",
//     looks: 27,
//   },
//   {
//     title: "찾습니다.",
//     author: "철수",
//     stacks: ["html", "css", "js"],
//     content: "어쩌구저쩌구 이런 사람을 찾아요!",
//     looks: 2,
//   },
//   {
//     title: "찾습니다.",
//     author: "철수",
//     stacks: ["html", "css", "js"],
//     content: "어쩌구저쩌구 이런 사람을 찾아요!",
//     looks: 255,
//   },
//   {
//     title: "찾습니다.",
//     author: "철수",
//     stacks: ["html", "css", "js"],
//     content: "어쩌구저쩌구 이런 사람을 찾아요!",
//     looks: 25,
//   },
//   {
//     title: "찾습니다.",
//     author: "철수",
//     stacks: ["html", "css", "js"],
//     content:
//       "어쩌구저쩌구 이런 사람을 찾아요!라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라",
//     looks: 5,
//   },
//   {
//     title: "찾습니다.",
//     author: "철수",
//     stacks: ["html", "css", "js"],
//     content: "어쩌구저쩌구 이런 사람을 찾아요!",
//     looks: 305,
//   },
// ];

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

// postList
const main = document.createElement("main");
container.appendChild(main);
// 상단에 모집게시판
const h1 = createEleId("h1", "gatherPost");
const a1 = document.createElement("a");
a1.setAttribute("href", "/gatherList");
a1.innerText = "모집 게시판";
h1.appendChild(a1);
main.appendChild(h1);
// 리스트 6개
const postList = createPostCard();
main.appendChild(postList);

// 글 작성버튼
const a = addEleClass("a", "post-write");
a.href = "/"; // 누르면 이동
a.innerText = "글 작성하기";
main.appendChild(a);

// Footer
const footer = makeFooter();

container.appendChild(footer);

document.body.appendChild(container);

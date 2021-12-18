const body = document.querySelector("body");
const main = document.createElement("main");
const h1 = document.createElement("h1");
const a1 = document.createElement("a");

function postContainer() {
  const section = document.createElement("section");
  body.appendChild(main);
  h1.id = "gatherPost";
  a1.setAttribute("href", "./gatherList.html");
  a1.innerText = "모집 게시판";
  h1.appendChild(a1);
  section.id = "post-list";
  main.appendChild(h1);
  main.appendChild(section);
}

// 통신으로 넘어올 데이터? (최신글이 밑으로 추가될것같음)
const data = [
  {
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 27,
  },
  {
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 2,
  },
  {
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 255,
  },
  {
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 25,
  },
  {
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content:
      "어쩌구저쩌구 이런 사람을 찾아요!라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라",
    looks: 5,
  },
  {
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 305,
  },
];
// 한 페이지에 여섯개(넘어온 데이터만큼 만들되 pagination 구현 필요)
function createPostCard() {
  // 최신글부터 6개 띄워주기
  for (let i = 6 - 1; i >= 0; i--) {
    const article = document.createElement("article");
    const h4 = document.createElement("h4");
    const h2 = document.createElement("h2");
    const strong = document.createElement("strong");
    const p = document.createElement("p");
    const span = document.createElement("span");
    article.className = "post";
    h2.className = "post-title";
    h4.className = "post-author";
    strong.className = "post-stack";
    p.className = "post-content";
    span.className = "post-look";

    h2.innerText = data[i].title;
    h4.innerText = data[i].author;
    strong.innerText = data[i].stacks;
    p.innerText = data[i].content;
    span.innerText = data[i].looks;

    if (p.innerText.length > 50) {
      p.innerText = p.innerText.substring(0, 49) + "...";
    }
    article.appendChild(h2);
    article.appendChild(h4);
    article.appendChild(strong);
    article.appendChild(p);
    article.appendChild(span);
    section.appendChild(article);
  }
  // 글 작성
  const a = document.createElement("a");
  a.className = "post-write";
  a.href = "../../about.html"; // 누르면 이동
  a.innerText = "글 작성하기";
  main.appendChild(a);
}

createPostCard();

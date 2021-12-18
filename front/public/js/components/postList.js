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

// 통신으로 넘어올 데이터? (최신글 마지막에 추가되는 방식?)
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

export function createPostCard() {
  const section = createEleId("section", "post-list");

  // 최신글부터 6개 띄워주기
  for (let i = data.length - 1; i >= data.length - 6; i--) {
    const article = addEleClass("article", "post");
    const h2 = addEleClass("h2", "post-title");
    const h4 = addEleClass("h4", "post-author");
    const strong = addEleClass("strong", "post-stack");
    const p = addEleClass("p", "post-content");
    const span = addEleClass("span", "post-look");

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
  return section;
}

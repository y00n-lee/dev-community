import { Post } from "./post.js";
import { createEleId } from "./utils.js";

const data = [
  {
    id: 0,
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 27,
  },
  {
    id: 1,
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 2,
  },
  {
    id: 2,
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 255,
  },
  {
    id: 3,

    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content: "어쩌구저쩌구 이런 사람을 찾아요!",
    looks: 25,
  },
  {
    id: 4,
    title: "찾습니다.",
    author: "철수",
    stacks: ["html", "css", "js"],
    content:
      "어쩌구저쩌구 이런 사람을 찾아요!라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라라",
    looks: 5,
  },
  {
    id: 5,
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
  // for (let i = 0; i < data.length; i++) {
  for (let i = 0; i < 6; i++) {
    const postCard = Post(data[i]);
    section.appendChild(postCard);
  }

  return section;
}

import { Post } from "./post.js";
import { createEleId } from "./utils.js";
import { createEleClass } from "./utils.js";
import { getPosts } from "../api/dummy/index.js";

// main의 최신글
export const getRecentPostList = getPosts({ page: 1, perPage: 6 })
  .then((res) => {
    if (!res.status) return alert(res.message);

    const postList = res.data.posts;
    return createPostCard(postList, postList.length);
  })
  .catch((e) => alert(e.message));

// 모집게시판의 글(pagination)
export const getPostList = (page, perPage) => {
  const pageContent = document.querySelector(".pageContent");

  getPosts({ page: page, perPage: perPage })
    .then((res) => {
      if (!res.status) return alert(res.message);

      const postList = res.data.posts;
      const postCard = createPostCard(postList, postList.length);
      pageContent.appendChild(postCard);

      return res;
    })
    .then((res) => {
      const pageList = createEleClass("div", "pageList");

      for (let i = 1; i <= res.data.totalPage; i++) {
        const pageNum = createEleClass("a", "pageNum");
        pageNum.appendChild(document.createTextNode(`${i}`));
        pageNum.setAttribute("href", `/posts?perPage=6&page=${i}`); // 경로 추가
        if (i === Number(page)) pageNum.className += " selectPage";
        pageList.appendChild(pageNum);
      }
      pageContent.appendChild(pageList);
      return res;
    })
    .catch((e) => alert(e.message));
};

function createPostCard(post, n) {
  const section = createEleId("section", "post-list");
  // 최신글부터 6개 띄워주기
  for (let i = 0; i < n; i++) {
    const postCard = Post(post[i]);
    section.appendChild(postCard);
  }
  return section;
}

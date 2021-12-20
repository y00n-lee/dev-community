import { createEleClass } from "./utils.js";

export function Post(data) {
  const article = createEleClass("article", "post");
  const h2 = createEleClass("h2", "post-title");
  const h4 = createEleClass("h4", "post-author");
  const strong = createEleClass("strong", "post-stack");
  const p = createEleClass("p", "post-content");
  const span = createEleClass("span", "post-look");

  // 데이터 처리영역 (형식 변경)
  h2.innerText = data.title;
  h4.innerText = data.author;
  strong.innerText = data.stacks;
  p.innerText = data.content;
  span.innerText = data.looks;

  if (p.innerText.length > 50) {
    p.innerText = p.innerText.substring(0, 49) + "...";
  }
  article.appendChild(h2);
  article.appendChild(h4);
  article.appendChild(strong);
  article.appendChild(p);
  article.appendChild(span);

  article.addEventListener("click", () => {
    window.location = `/posts/${data.id}`;
  });

  return article;
}

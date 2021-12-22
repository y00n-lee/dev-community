import { createEleClass } from "./utils.js";

export function Post(data) {
  const postCard = createEleClass("article", "post");
  const title = createEleClass("h2", "post-title");
  const author = createEleClass("h4", "post-author");
  const tags = createEleClass("strong", "post-stack");
  const content = createEleClass("p", "post-content");
  const views = createEleClass("span", "post-look");

  title.innerText = data.title;
  author.innerText = data.author.nickname;

  for (let i = 0; i < data.tags.length; i++) {
    tags.innerText += data.tags[i].content + " ";
  }
  content.innerText = data.content;
  views.innerText = data.views;

  if (content.innerText.length > 50) {
    content.innerText = content.innerText.substring(0, 49) + "...";
  }
  postCard.appendChild(title);
  postCard.appendChild(author);
  postCard.appendChild(tags);
  postCard.appendChild(content);
  postCard.appendChild(views);

  postCard.addEventListener("click", () => {
    window.location = `/posts/${data._id}`;
  });

  return postCard;
}

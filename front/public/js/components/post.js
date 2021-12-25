import { createEleClass } from "./utils.js";

export function Post(data) {
  const postCard = createEleClass("article", "post");
  const title = createEleClass("h2", "post-title");
  const author = createEleClass("h5", "post-author");
  const tagsList = createEleClass("div", "tags-list");
  const content = createEleClass("p", "post-content");
  const writeDate = createEleClass("span", "post-date");
  const views = createEleClass("span", "post-look");

  title.innerText = data.title.length <= 8 ? data.title : `${data.title.substring(8)}...`;
  author.innerText = data.author.nickname;

  const tagCount = data.tags.length > 3 ? 3 : data.tags.length;
  for (let i = 0; i < tagCount; i++) {
    const tags = createEleClass("span", "post-stack");
    tags.innerText = data.tags[i].content;
    tagsList.appendChild(tags);
  }

  content.innerText = data.content;

  const postDate = new Date(data.time);
  const year = postDate.getFullYear();
  const month = postDate.getMonth() + 1;
  const date = postDate.getDate();
  const formatDate = `${year}-${month >= 10 ? month : "0" + month}-${
    date >= 10 ? date : "0" + date
  }`;
  writeDate.innerText = formatDate;
  views.innerText = `조회수 ${data.views}`;

  if (content.innerText.length > 50) {
    content.innerText = content.innerText.substring(0, 49) + "...";
  }
  postCard.appendChild(title);
  postCard.appendChild(author);
  postCard.appendChild(tagsList);
  postCard.appendChild(content);
  postCard.appendChild(writeDate);
  postCard.appendChild(views);

  postCard.addEventListener("click", () => {
    window.location = `/posts/${data._id}`;
  });

  return postCard;
}

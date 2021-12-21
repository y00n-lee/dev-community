import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { makeComments } from "./components/comments.js";
import { addTextNode } from "./components/utils.js";

//import { getPost } from "./api/posts/getPost.js";
import { getPost, getUserInfo, editPost, deletePost, addMember } from "./api/dummy/index.js";
//import { getUserInfo } from "./api/user/getUserInfo.js";
//import { editPost } from "./api/posts/editPost.js";
//import { deletePost } from "./api/posts/deletePost.js";

const user = getUserInfo(1);

const pathname = window.location.pathname.split("/");
const currentPostId = pathname[pathname.length - 1];

const postData = getPost(currentPostId);
// .then((res) => {
//   if (!res.status) alert(res.message);
// })
// .catch((e) => alert(e.message));

const container = document.querySelector(".container");
// Header
const header = makeHeader();
container.prepend(header);
// Gather Title
addTextNode(document.getElementById("gatherTitle"), `${postData.data.post.title}`);
// Gather Content
document
  .getElementById("gatherContent")
  .appendChild(document.createTextNode(`${postData.data.post.content}`));

// Gather TechStack
const gatherTechStackSpan = document.getElementById("gatherTechStack");
for (let i = 0; i < postData.data.post.tags.length; i++) {
  const techStackImg = document.createElement("p");
  techStackImg.appendChild(document.createTextNode(`${postData.data.post.tags[i].content}`));
  gatherTechStackSpan.appendChild(techStackImg);
}

//Button
// "sukho1007@naver.com"
// 글 작성자와 유저가 같은 경우와 다른 경우
if (user.data.user.email == postData.data.post.author.email) {
  document.getElementById("update").style.display = "block";
  document.getElementById("delete").style.display = "block";
  document.getElementById("participate").style.display = "none";
} else {
  document.getElementById("update").style.display = "none";
  document.getElementById("delete").style.display = "none";
  document.getElementById("participate").style.display = "block";
}

// document.getElementById("update").addEventListener("click", function () {
//   editPost({
//     postId: postData.data.post._id,
//     title: postData.data.post.title,
//     content: postData.data.post.content,
//     tagList: postData.data.post.tags,
//   })
//     .then((res) => {
//       alert(res.message);
//       window.location = `/edit/post/${currentPostId}`;
//     })
//     .catch((e) => alert(e.message));
// });

document.getElementById("delete").addEventListener("click", function () {
  deletePost(postData.data.post._id)
    .then((res) => {
      alert(res.message);
      window.location = "/posts";
    })
    .catch((e) => alert(e.message));
});

document.getElementById("participate").addEventListener("click", function () {
  addMember(postData.data.post._id)
    .then((res) => {
      if (!res.status) alert(res.message);
      else {
        alert(res.message);
        window.location = "/posts";
      }
    })
    .catch((e) => alert(e.message));
});

document.getElementById("gotoList").addEventListener("click", function () {
  window.location.href = "/posts";
});

makeComments(postData.data.post, user);

//footer
const footer = makeFooter();
container.append(footer);

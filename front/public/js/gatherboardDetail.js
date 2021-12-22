import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
import { makeComments } from "./components/comments.js";
import { addTextNode } from "./components/utils.js";

//import { getPost } from "./api/posts/getPost.js";
import { getPost, deletePost, addMember, checkSignin, deleteMember } from "./api/dummy/index.js";
//import { getUserInfo } from "./api/user/getUserInfo.js";
//import { editPost } from "./api/posts/editPost.js";
//import { deletePost } from "./api/posts/deletePost.js";
//import { deleteMember } from "./api/posts/deleteMember.js";

// 사용자 함수
// Post Construction
function postConstruction(post) {
  // Post Title
  addTextNode(document.getElementById("gatherTitle"), `${post.title}`);
  // Post Content
  addTextNode(document.getElementById("gatherContent"), `${post.content}`);
  // Gather TechStack
  const gatherTechStackSpan = document.getElementById("gatherTechStack");
  for (let i = 0; i < post.tags.length; i++) {
    const techStackImg = document.createElement("p");
    techStackImg.appendChild(document.createTextNode(``));
    gatherTechStackSpan.appendChild(techStackImg);
  }
}

function setDisplayButtons(user, post) {
  if (user.id === post.author._id) {
    document.getElementById("delete").style.display = "block";
    document.getElementById("participate").style.display = "none";
  } else {
    document.getElementById("delete").style.display = "none";
    document.getElementById("participate").style.display = "block";
  }
}
// Setting Delete Button
function setDeleteButton(postId) {
  document.getElementById("delete").addEventListener("click", function () {
    deletePost(postId)
      .then((res) => {
        if (!res.status) return alert(res.message);
        window.location = "/posts";
      })
      .catch((e) => alert(e.message));
  });
}

// Setting Participation button
function setParticipateButton(post, user) {
  const memberIds = [];
  post.members.forEach((el) => {
    memberIds.push(el._id);
  });
  if (memberIds.includes(user.data.id)) {
    document.getElementById("participate").innerText = "참가해제";
  } else {
    document.getElementById("participate").innerText = "참가하기";
  }

  document.getElementById("participate").addEventListener("click", function () {
    if (!user.status) {
      alert("로그인 후 이용 가능합니다.");
    } else {
      if (memberIds.includes(user.data.id)) {
        deleteMember(post._id)
          .then((res) => {
            alert(res.message);
            if (res.status) window.location.reload();
          })
          .catch((e) => alert(e.message));
      } else {
        addMember(post._id)
          .then((res) => {
            alert(res.message);
            if (res.status) window.location.reload();
          })
          .catch((e) => alert(e.message));
      }
    }
  });
}

const pathname = window.location.pathname.split("/");
const currentPostId = pathname[pathname.length - 1];

const container = document.querySelector(".container");
// Header
const header = makeHeader();
container.prepend(header);

// Setting GotoList Button
document.getElementById("gotoList").addEventListener("click", function () {
  window.location.href = "/posts";
});

//footer
const footer = makeFooter();
container.append(footer);

// 비동기 처리 부분
getPost(currentPostId)
  .then((res) => {
    if (!res.status) alert(res.message);
    else {
      postConstruction(res.data.post);
      setDeleteButton(res.data.post._id);
      checkSignin()
        .then((res1) => {
          setDisplayButtons(res1.data, res.data.post);
          setParticipateButton(res.data.post, res1);
          // Comments
          makeComments(res.data.post, res1.data);
        })
        .catch((e1) => alert(e1.message));
    }
  })
  .catch((e) => alert(e.message));

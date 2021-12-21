import { createEleId, createEleClass, addTextNode, removeChildsAll } from "./utils.js";
import { addComment } from "../api/dummy/index.js";
//import { addComment } from "../api/posts/addComment.js";

// Comments Header
function cmtHeader(comments) {
  removeChildsAll(document.getElementById("cmtCount"));
  addTextNode(document.getElementById("cmtCount"), "댓글");
  const cmtCount = document.createElement("strong");
  addTextNode(cmtCount, `(${comments.length})`);
  document.getElementById("cmtCount").append(cmtCount);
}

// Comments List
function commentsLists(comments) {
  const cmtLists = document.getElementById("cmtLists");
  removeChildsAll(cmtLists);
  for (let i = 0; i < comments.length; i++) {
    const cmtList = createEleClass("li", "cmtList");

    // Author
    const author = createEleClass("span", "cmtAuthor");
    addTextNode(author, `작성자: ${comments[i].author}`);
    cmtList.appendChild(author);

    // Comment
    const comment = createEleClass("p", "cmtComment");
    addTextNode(comment, `> ${comments[i].content}`);
    comment.style.color = "#7979d3";
    cmtList.appendChild(comment);
    cmtLists.appendChild(cmtList);
  }
}

function appendComment(comments, user) {
  event.preventDefault();
  if (document.getElementById("cmtComment").value.length > 0) {
    const comment = {
      _id: user.id,
      author: user.nickname,
      content: `${document.getElementById("cmtComment").value}`,
      createAt: new Date(),
      updateAt: new Date(),
    };
    comments.push(comment);
    cmtHeader(comments);
    commentsLists(comments);
    cmtMainTail(comments, user);
  }
}
// Comments Make
function cmtMainTail(post, user) {
  const cmtFormTableRow = document.getElementById("cmtFormTableRow");
  removeChildsAll(cmtFormTableRow);
  // Comment Author
  const cmtAuthorTd = document.createElement("td");
  const cmtAuthor = createEleClass("div", "cmtTableAuthor");
  addTextNode(cmtAuthor, `${user.nickname}`);
  cmtAuthorTd.appendChild(cmtAuthor);
  cmtFormTableRow.appendChild(cmtAuthorTd);

  // Comment
  const cmtCommentTd = document.createElement("td");
  const cmtCommentText = createEleId("textarea", "cmtComment");
  cmtCommentText.setAttribute("name", "COMMENT");
  cmtCommentTd.appendChild(cmtCommentText);
  cmtFormTableRow.appendChild(cmtCommentTd);

  // Submit button
  const cmtBtnTd = createEleClass("td", "cmtBtnTd");
  const cmtBtn = createEleId("button", "cmtBtn");
  addTextNode(cmtBtn, "등록");
  cmtForm.addEventListener("submit", function () {
    //appendComment(post.comments, user);
    addComment({ postId: post._id, content: `${document.getElementById("cmtComment").value}` })
      .then((res) => {
        if (res.status) alert(res.message);
      })
      .catch((e) => alert(e.message));
  });
  cmtBtnTd.appendChild(cmtBtn);
  cmtFormTableRow.appendChild(cmtBtnTd);
}

export function makeComments(post, user) {
  // 게시글 헤더
  cmtHeader(post.comments);
  // 게시글의 댓글 출력
  commentsLists(post.comments);
  // 게시글의 댓글 입력 부분
  cmtMainTail(post, user);
}

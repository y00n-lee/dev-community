import { createEleId, createEleClass, addTextNode, removeChildsAll } from "./utils.js";
import { addComment } from "../api/posts/addComment.js";

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
    addTextNode(author, `작성자: ${comments[i].author.nickname}`);
    cmtList.appendChild(author);

    // Comment
    const comment = createEleClass("p", "cmtComment");
    addTextNode(comment, `> ${comments[i].content}`);
    comment.style.color = "#7979d3";
    cmtList.appendChild(comment);
    cmtLists.appendChild(cmtList);
  }
}
// Comments Make
function cmtMainTail(post) {
  const cmtFormTableRow = document.getElementById("cmtFormTableRow");
  removeChildsAll(cmtFormTableRow);

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
  cmtForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const commentValue = document.getElementById("cmtComment").value;
    if (commentValue.length > 0) {
      addComment({ postId: post._id, content: commentValue })
        .then((res1) => {
          alert(res1.message);
          if (res1.status) window.location.reload();
        })
        .catch((e) => alert(e.message));
    } else {
      alert("내용을 입력하세요.");
    }
  });
  cmtBtnTd.appendChild(cmtBtn);
  cmtFormTableRow.appendChild(cmtBtnTd);
}

export function makeComments(post) {
  // 게시글 헤더
  cmtHeader(post.comments);
  // 게시글의 댓글 출력
  commentsLists(post.comments);
  // 게시글의 댓글 입력 부분
  cmtMainTail(post);
}

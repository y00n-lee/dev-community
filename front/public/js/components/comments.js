// Create Element Id
function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);

  return ele;
}

// Create Elemen Class
function addEleClass(el, classNames) {
  const ele = document.createElement(`${el}`);
  const classArray = classNames.split(" ");
  for (let i = 0; i < classArray.length; i++) {
    ele.classList.add(`${classArray[i]}`);
  }

  return ele;
}

// Add textnode to element
function addTextNode(ele, text) {
  ele.appendChild(document.createTextNode(`${text}`));
}

// Comments Header
function cmtHeader(comments) {
  // Comments Count Function
  function commentCount(comments) {
    const cmtCount = document.createElement("strong");
    addTextNode(cmtCount, `(${comments.length})`);
    return cmtCount;
  }

  const cmtHead = addEleClass("div", "cmtHead");
  const cmtCount = document.createElement("h4");
  addTextNode(cmtCount, "댓글");
  cmtCount.appendChild(commentCount(comments));
  cmtHead.appendChild(cmtCount);

  return cmtHead;
}

// Comments List
function cmtMain(comments) {
  // Comments List
  function commentsLists(comments) {
    const cmtLists = addEleClass("ul", "cmtLists");
    for (let i = 0; i < comments.length; i++) {
      const cmtList = addEleClass("li", "cmtList");

      // Author
      const author = addEleClass("span", "cmtAuthor");
      addTextNode(author, `작성자: ${comments[i].author}`);
      cmtList.appendChild(author);

      // Comment
      const comment = addEleClass("p", "cmtComment");
      addTextNode(comment, `> ${comments[i].cmt}`);
      cmtList.appendChild(comment);
      cmtLists.appendChild(cmtList);
    }
    return cmtLists;
  }

  const cmtMain = addEleClass("div", "cmtMain");
  cmtMain.appendChild(commentsLists(comments));
  return cmtMain;
}

function addComment(comments, user) {
  event.preventDefault();
  if (document.getElementById("cmtComment").value.length > 0) {
    const comment = {
      cmt: `${document.getElementById("cmtComment").value}`,
      author: user.nickname,
    };
    console.log(comment);
    comments.push(comment);
    const cmtWrap = document.querySelector("#cmtWrap");
    while (cmtWrap.hasChildNodes()) {
      cmtWrap.removeChild(cmtWrap.firstChild);
    }
    cmtWrap.appendChild(cmtHeader(comments));
    cmtWrap.appendChild(cmtMain(comments));
    cmtWrap.appendChild(cmtMainTail(comments, user));
  }
}
// Comments Make
function cmtMainTail(comments, user) {
  const cmtMainTail = addEleClass("div", "cmtMainTail");
  const cmtForm = createEleId("form", "cmtForm");
  cmtForm.setAttribute("name", "cmtForm");
  cmtForm.setAttribute("action", "");
  const cmtFormTable = addEleClass("table", "cmtFormTable");
  const cmtFormTableTbody = document.createElement("tbody");
  const cmtFormTableTbodyRow = document.createElement("tr");

  // Comment Author
  const cmtAuthorTd = document.createElement("td");
  const cmtAuthor = addEleClass("div", "cmtTableAuthor");
  addTextNode(cmtAuthor, `${user.nickname}`);
  cmtAuthorTd.appendChild(cmtAuthor);
  cmtFormTableTbodyRow.appendChild(cmtAuthorTd);

  // Comment
  const cmtCommentTd = document.createElement("td");
  const cmtCommentText = createEleId("textarea", "cmtComment");
  cmtCommentText.setAttribute("name", "COMMENT");
  cmtCommentTd.appendChild(cmtCommentText);
  cmtFormTableTbodyRow.appendChild(cmtCommentTd);

  // Submit button
  const cmtBtnTd = addEleClass("td", "cmtBtnTd");
  const cmtBtn = createEleId("button", "cmtBtn");
  addTextNode(cmtBtn, "등록");
  cmtForm.addEventListener("submit", function () {
    addComment(comments, user);
  });
  cmtBtnTd.appendChild(cmtBtn);
  cmtFormTableTbodyRow.appendChild(cmtBtnTd);

  cmtFormTableTbody.appendChild(cmtFormTableTbodyRow);
  cmtFormTable.appendChild(cmtFormTableTbody);
  cmtForm.appendChild(cmtFormTable);
  cmtMainTail.appendChild(cmtForm);
  return cmtMainTail;
}

export function makeComments(comments, user) {
  const cmtWrap = createEleId("div", "cmtWrap");
  // 게시글 헤더
  const cmtHead = cmtHeader(comments);
  cmtWrap.appendChild(cmtHead);
  // 게시글의 댓글 출력
  const cmtWrapMain = cmtMain(comments);
  cmtWrap.appendChild(cmtWrapMain);
  // 게시글의 댓글 입력 부분
  const cmtFormWrap = cmtMainTail(comments, user);
  cmtWrap.appendChild(cmtFormWrap);

  return cmtWrap;
}

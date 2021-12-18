const commentAdd = document.getElementById("submit");
const comment = document.getElementById("comment");
const time = document.getElementById("time");
const inputData = document.getElementById("addComment"); // 댓글 input

commentAdd.addEventListener("click", (e) => {
  e.preventDefault();
  const h5 = document.createElement("h5");
  const p = document.createElement("p");
  h5.className = "commentAuthor";
  p.className = "commentContent";

  h5.textContent = "익명";
  p.textContent = inputData.value;

  h5.appendChild(p);
  comment.appendChild(h5);
  // time.textContent = new Date();
});

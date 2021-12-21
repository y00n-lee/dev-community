import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
//import { createPost } from "./api/posts/createPost.js";
import { createPost } from "./api/dummy/index.js";

// TechStack Checkbox
function techStackCheckBox(techStack) {
  const div = document.getElementById("techStackBlock");
  for (let i = 0; i < techStack.length; i++) {
    const checkInputLabel = document.createElement("label");
    const checkInput = document.createElement("input");
    checkInput.setAttribute("type", "checkbox");
    checkInput.setAttribute("name", "techStack");
    checkInput.setAttribute("value", `${techStack[i]}`);
    checkInputLabel.appendChild(checkInput);
    checkInputLabel.appendChild(document.createTextNode(`${techStack[i]}`));
    div.appendChild(checkInputLabel);
  }
}

// dummy data
const techStackData = ["HTML", "CSS", "JAVASCRIPT", "NODEJS", "SPRING", "EXPRESS", "REACT"];

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// Main
techStackCheckBox(techStackData);

//button
document.getElementById("make").addEventListener("click", function () {
  const _title = document.getElementById("title").value;
  const _content = document.getElementById("content").value;
  const query = 'input[name="techStack"]:checked';
  const techStackCheck = document.querySelectorAll(query);
  const tagsList = [];
  techStackCheck.forEach((el) => {
    tagsList.push(el.value);
  });
  if (!_title) {
    alert("제목을 입력하세요!");
  } else if (!_content) {
    alert("내용을 입력하세요!");
  } else if (tagsList.length < 1) {
    alert("모집하고자 하는 기술 태그를 체크하세요!");
  } else {
    createPost({
      title: _title,
      content: _content,
      tagList: tagsList,
    })
      .then((res) => {
        alert(res.message);
        if (res.status) window.location = "/posts";
      })
      .catch((e) => alert(e.message));
  }
});

document.getElementById("cancel").addEventListener("click", function () {
  window.location.href = "/posts";
});
// Footer
const footer = makeFooter();
container.appendChild(footer);

document.body.appendChild(container);

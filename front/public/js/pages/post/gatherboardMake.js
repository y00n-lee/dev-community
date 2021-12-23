import { makeHeader } from "../../components/header.js";
import { makeFooter } from "../../components/footer.js";
import { makeSkillTag, selectTag } from "../../components/tag.js";
import { removeChildsAll } from "../../components/utils.js";

import { createPost } from "../../api/posts/createPost.js";

// dummy data
const techStackData = [];

// TechStack Checkbox
function tagBox(techStack, inputId) {
  const div = document.getElementById("tagForm");
  techStack.forEach((el) => {
    div.appendChild(makeSkillTag(el, true, false));
  });
  div.innerHTML += `<span class="box">
  <input id="${inputId}" type="text" name="${inputId}" class="int" maxlength="40"/>
</span>`;
}

//Body
const container = document.querySelector(".container");

// Header
const header = makeHeader();
container.prepend(header);

// Main
tagBox(techStackData, "techTag");

document.getElementById("tagForm").addEventListener("submit", function (event) {
  event.preventDefault();
  let techTagValue = document.getElementById("techTag").value;
  if (techTagValue) {
    techStackData.push(techTagValue);
    removeChildsAll(document.getElementById("tagForm"));
    tagBox(techStackData, "techTag");
  }
  document.getElementById("techTag").focus();
});

//button
document.getElementById("make").addEventListener("click", function () {
  const _title = document.getElementById("title").value;
  const _content = document.getElementById("content").value;
  const tagsList = selectTag();

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
  window.location = "/posts";
});

// Footer
const footer = makeFooter();
container.appendChild(footer);

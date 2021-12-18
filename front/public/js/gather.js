const button = document.createElement("input");
function getLists() {
  let list = document.getElementById("gather-list");
  let main = document.querySelector("main");

  // 카드 리스트 부분
  for (let i = 0; i < 6; i++) {
    list.innerHTML += `<article class="gather-list-items">
    <h3>제목</h3>
    <h4>기술스택</h4>
    <p class="p-text">
      내용내용
    </p>
  </article>`;
  }
  // 무한 스크롤 or 페이지네이션

  // 글작성 버튼 부분
  button.value = "새 글 작성";
  button.type = "submit";
  button.name = "submit";
  button.id = "submit";
  button.classList += "writing";
  main.append(button);
}
function newWriting() {
  // 새 글 작성 버튼 클릭시 동작 부분
  console.log("새 글 작성을 눌렀습니다");
}
getLists();
button.addEventListener("click", newWriting);

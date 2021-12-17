/* <div class="flex-item">
  <img class="image" src="./img/about/man1.png" alt="" srcset="" />
  <h3>장병연</h3>
  <h4>프론트엔드/팀장</h4>
  <p class="p-text">
    안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요,
    장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다.
    안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다.
  </p>
</div>; */
console.log("hey");
function getLists() {
  let list = document.getElementById("gather-list");
  for (let i = 0; i < 9; i++) {
    list.innerHTML += `<article class="gather-list-items">
    <h3>제목</h3>
    <h4>기술스택</h4>
    <p class="p-text">
      내용내용
    </p>
  </article>`;
  }
}
getLists();

// const card = (function () {
//   const main = document.querySelector("#main");
//   const container = document.createElement("section");
//   container.classList += "flex-container";

//   // member 정보 불러오기
//   const memberCount = 5; // 임의설정, member 수 데이터 가져와야 함

//   for (let i = 0; i < memberCount; i++) {
//     const items = document.createElement("article");
//     items.classList += "flex-item";
//   }
//   // console.log("a");
//   //   var tag = "";
//   // for(i=0; i<1000; i++){
//   // 	tag += "<div id='test'+i>"+i+"</div>";
//   // }
//   // $("#innerTable").append(tag);
// })();


import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
// User Function
// Create Element Id
function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);

  return ele;
}

// Create Elemen Class
function addEleClass(el, className) {
  const ele = document.createElement(`${el}`);
  ele.classList.add(`${className}`);

  return ele;
}

//Body
const container = addEleClass("div", "container");

// Header
const header = makeHeader();
container.appendChild(header);

/* <img class="about-img" src="./img/about/aboutus.jpg" alt="" srcset="" />
        <div class="flex-container">
          <div class="flex-item">
            <img class="image" src="./img/about/man1.png" alt="" srcset="" />
            <h3>장병연</h3>
            <h4>프론트엔드/팀장</h4>
            <p class="p-text">
              안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다.
              안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다.
              안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다. 안녕하세요, 장병연입니다.
            </p>
          </div>
          <div class="flex-item">
            <img class="image" src="./img/about/man2.png" alt="" srcset="" />
            <h3>김윤성</h3>
            <h4>프론트엔드</h4>
            <p class="p-text">안녕하세요, 김윤성입니다.</p>
          </div>
          <div class="flex-item">
            <img class="image" src="./img/about/man3.png" alt="" srcset="" />
            <h3>옥경표</h3>
            <h4>백엔드</h4>
            <p class="p-text">안녕하세요, 옥경표입니다.</p>
          </div>
          <div class="flex-item">
            <img class="image" src="./img/about/woman1.png" alt="" srcset="" />
            <h3>이지윤</h3>
            <h4>프론트엔드</h4>
            <p class="p-text">안녕하세요, 이지윤입니다.</p>
          </div>
          <div class="flex-item">
            <img class="image" src="./img/about/man4.png" alt="" srcset="" />
            <h3>지석호</h3>
            <h4>백엔드</h4>
            <p class="p-text">안녕하세요, 지석호입니다.</p>
          </div>
        </div> */

// AppendChild Components - Main

section.appendChild(form);
main.appendChild(mainHeadName);
main.appendChild(section);
container.appendChild(main);

// Footer
const footer = makeFooter();

container.appendChild(footer);

document.body.appendChild(container);


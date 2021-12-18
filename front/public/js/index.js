import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";

// Create Element Id
function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);

  return ele;
}

// Create Elemen Class
function addEleClass(el, classNames) {
  const ele = document.createElement(`${el}`);
  if (!classNames) return ele;
  // Create Elemen Class
  const classArray = classNames.split(" ");
  for (let i = 0; i < classArray.length; i++) {
    ele.classList.add(`${classArray[i]}`);
  }
  return ele;
}

// Create Service Description Card
function services(imgName, head, desc) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const servHead = document.createElement("h3");
  const servDesc = document.createElement("p");

  img.setAttribute("src", `img/${imgName}`);
  div.appendChild(img);

  servHead.appendChild(document.createTextNode(`${head}`));
  div.appendChild(servHead);

  servDesc.appendChild(document.createTextNode(`${desc}`));
  div.appendChild(servDesc);

  return div;
}

const serviceList = [
  {
    img: "dummy.PNG",
    head: "모집게시판",
    desc: "프로젝트를 같이 진행할 개발자를 찾아보세요.",
  },
  {
    img: "dummy.PNG",
    head: "사용자 프로필",
    desc: "E-mail, 기술스택, Github 주소로 자신을 나타내보세요.",
  },
];

const container = document.createElement("div");
container.classList.add("container");

const header = makeHeader();
container.appendChild(header);

const main = addEleClass("main", "");

// Main Image
const mainImgSection = addEleClass("section", "");
const mainImgDiv = addEleClass("div", "mainImage");
const mainImage = addEleClass("img", "image");
mainImage.setAttribute("src", "img/main.jpg");
mainImage.setAttribute("alt", "메인화면");
const mainImageText = addEleClass("div", "text");
const mainImageTextHead = document.createElement("h1");
mainImageTextHead.appendChild(document.createTextNode(`개발자를 찾아요`));
const mainImageTextDesc = document.createElement("p");
mainImageTextDesc.appendChild(
  document.createTextNode(`함께 프로젝트를 진행 할 개발자를 찾습니다!`),
);

mainImageText.appendChild(mainImageTextHead);
mainImageText.appendChild(mainImageTextDesc);
mainImgDiv.appendChild(mainImage);
mainImgDiv.appendChild(mainImageText);
mainImgSection.appendChild(mainImgDiv);
main.appendChild(mainImgSection);

// Services Description
const serviceDescSection = addEleClass("section", "serviceDescription");
const serviceDescSectionTitle = addEleClass("h2", "serviceTitle");
serviceDescSectionTitle.appendChild(document.createTextNode("서비스 설명"));
serviceDescSection.appendChild(serviceDescSectionTitle);

const servicesDiv = addEleClass("div", "services");

for (let i = 0; i < serviceList.length; i++) {
  servicesDiv.appendChild(services(serviceList[i].img, serviceList[i].head, serviceList[i].desc));
}

main.appendChild(serviceDescSection);
main.appendChild(servicesDiv);

// Recent Posts
const recentPostsSection = addEleClass("section", "recentPost");
const recentPostsSectionTitle = document.createElement("h2");
recentPostsSectionTitle.appendChild(document.createTextNode("최신 글"));

recentPostsSection.appendChild(recentPostsSectionTitle);
main.appendChild(recentPostsSection);

container.appendChild(main);

// Footer
const footer = makeFooter();
container.appendChild(footer);

document.body.appendChild(container);

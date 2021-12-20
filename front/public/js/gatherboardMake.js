import { makeHeader } from "./components/header.js";
import { makeFooter } from "./components/footer.js";
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
// Footer
const footer = makeFooter();
container.appendChild(footer);

document.body.appendChild(container);

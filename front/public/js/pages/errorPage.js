import { makeHeader } from "../components/header.js";
import { makeFooter } from "../components/footer.js";

const container = document.querySelector(".container");
const header = makeHeader();
container.prepend(header);

const footer = makeFooter();
container.appendChild(footer);

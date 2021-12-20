export function createEleId(el, id) {
  const ele = document.createElement(`${el}`);
  ele.setAttribute("id", `${id}`);
  return ele;
}

// Create Elemen Class
export function createEleClass(el, className) {
  const ele = document.createElement(`${el}`);
  ele.classList.add(`${className}`);

  return ele;
}

// Add textnode to element
export function addTextNode(ele, text) {
  ele.appendChild(document.createTextNode(`${text}`));
}

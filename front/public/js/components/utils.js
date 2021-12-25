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

// Remove all childs
export function removeChildsAll(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstChild);
  }
}
// 자식노드에 데이터를 넣어 부모노드에 추가하는 함수
export function addChild(parent, child, data) {
  addTextNode(child, data);
  parent.appendChild(child);
}

// null check function
export function isNull(array) {
  for (let i = 0; i < array.length; i++) if (!array[i]) return true; // null: return true
  return false; // not null: return false
}

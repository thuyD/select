let Node = require("./dom_node_collection");

window.$l = (arg) => {};

function $l(selector) {
  let arrList = [];

  if (selector instanceof HTMLElement) {
    //when the selector is a DOM object aka node
    arrList = [selector];
  } else {
    //when the selector references multiple elements
    //querySelectorAll returns a nodeList that can be indexed into
    const elementList = document.querySelectorAll(selector);
    arrList = Array.from(elementList);
  }

  return new Node(arrList);
}



window.$l = $l;

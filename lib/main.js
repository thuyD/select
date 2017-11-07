let Node = require("./dom_node_collection");

window.$l = (arg) => {};

const callbacks = [];

function $l(selector) {
  let arrList = [];

  if (typeof selector === "function") {
    //add function to queue, each will be called when document is loaded
    callbacks.push(selector);
  } else if (selector instanceof HTMLElement) {
    //when the selector is a DOM object aka node
    arrList = [selector];
  } else {
    //when the selector is a string containing one or more css selectors
    //querySelectorAll returns a nodeList that can be indexed into
    const elementList = document.querySelectorAll(selector);
    //creates a new Array instance from array-like object
    arrList = Array.from(elementList);
  }

  //return an instance of DOMNodeCollection
  return new Node(arrList);
}

document.addEventListener(
  "DOMContentLoaded",
  () => {
    callbacks.forEach((func) => {
      func();
    });
  },
  false
);

window.$l = $l;

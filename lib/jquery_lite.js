/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let Node = __webpack_require__(1);

window.$l = (arg) => {};

function $l(selector) {
  let arrList = [];

  if (selector instanceof HTMLElement) {
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



window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (nodes) {
    //all the methods defined will be applied to every single node
    //in the nodes array
    this.nodes = nodes;
  }

  each(callback) {
    this.nodes.forEach(callback);
  }

  html(str) {
    if (str !== undefined) {
      this.each((node) => {
        node.innerHTML = str;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(el){
    if (el instanceof HTMLElement) {
      this.each((node) => {
        node.innerHTML += el.outerHTML;
      });
    } else if (typeof el === "string") {
      this.each((node) => {
        node.innerHTML += el;
      });
    } else if (el instanceof DOMNodeCollection) {
      this.each((node) => {
        el.each((element) => {
          node.innerHTML += element.outerHTML;
        });
      });
    }
  }

  attr(attrName, value){
    let name = null;
    this.each((node) => {
      if (value) {
        node.setAttribute(attrName, value);
      } else {
        name = node.getAttribute(attrName);
      }
    });

    return name;
  }

  addClass(className){
    this.each((node) => {
      node.className = className;
    });
  }

  removeClass(className){
    this.each((node) => {
      if (className) {
        if (node.classList.value === className) {
          node.classList.remove(className);
        }
      } else {
        node.classList.remove(className);
      }
    });
  }

  children() {
    let children = [];
    this.each((node) => {
      Array.from(node.children).forEach((child) => {
        children.push(child);
      });
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    this.each((node) => {
      if (!parents.includes(node.parentNode)) {
        parents.push(node.parentNode);
      }
    });

    return new DOMNodeCollection(parents);
  }

  remove() {
    this.each((node) => {
      node.remove();
    });

    return this;
  }

  find(selector){
    let nodes = [];
    this.each((node) => {
      node.querySelectorAll(selector);
    });
  }
}





module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
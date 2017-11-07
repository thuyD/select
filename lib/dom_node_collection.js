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

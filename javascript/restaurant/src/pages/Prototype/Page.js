import { ComponentFactory } from "../../components/ComponentFactory/ComponentFactory.js";

class Page {
  constructor(container) {
    this.outputElement = container;
    this.componentFactory = new ComponentFactory(container);
    this.componentList = [];
  }

  _addComponent(componentObject) {
    this.componentList.push(componentObject);
  }

  _clearContainer() {
    while (this.outputElement.firstChild) {
      this.outputElement.removeChild(this.outputElement.firstChild);
    }
  }

  render() {
    this._clearContainer();
    this.componentList.forEach((component) => component.render());
  }
}

export { Page };

class Component {
  constructor(container) {
    this.targetContainer = container;
    this.domLocation = null;
    this.outputElement = document.createElement("div");
  }

  _updateOutputElement() {
    /* 
    this.outputElement.className = <style>;
    this.outputElement.innerHTML = `<html>`;
    */
  }

  _bindHandler(event, handler) {
    this.outputElement.addEventListener(event, handler);
  }

  render() {
    this._updateOutputElement();
    if (this.domLocation != null) {
      this.domLocation.innerHTML = this.outputElement.innerHTML;
    } else {
      this.targetContainer.append(this.outputElement);
      this.domLocation = this.targetContainer.lastChild;
    }
  }
}

export { Component };

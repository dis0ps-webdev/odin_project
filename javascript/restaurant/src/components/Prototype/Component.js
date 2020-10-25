class Component {
  constructor(container) {
    this.targetContainer = container;
    this.domLocation = null;
    this.debounceTimer = null;
    this.outputElement = document.createElement("div");
  }

  _updateOutputElement() {
    /* 
    this.outputElement.className = <style>;
    this.outputElement.innerHTML = `<html>`;
    */
  }

  _bindWindowDebounce(event, handler, delay) {
    window.addEventListener(event, () => {
      if (this.debounceTimer != null) {
        window.clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = window.setTimeout(handler, delay);
    });
  }

  _bindWindowHandler(event, handler) {
    window.addEventListener(event, handler);
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

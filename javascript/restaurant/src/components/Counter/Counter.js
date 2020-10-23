import styles from "./Counter.local.css";

class Counter {
  constructor(container) {
    this.counter = 0;
    this.targetContainer = container;
    this.domLocation = null;
    this.outputElement = document.createElement("div");
    this._bindClick();
  }

  _updateOutputElement() {
    this.outputElement.className = styles["component-wrapper"];
    this.outputElement.innerHTML = `
    <div class=${styles["counter"]}>
      <h1 class=${styles["header"]}>
        ${this.counter}
      </h1>
    </div>
    `;
  }

  _bindClick() {
    this.outputElement.addEventListener("click", (e) =>
      this._incrementCounter(e)
    );
  }

  _incrementCounter(e) {
    let styledItems = Object.values(styles);
    if (styledItems.includes(e.target.className)) {
      this.counter++;
      this.render();
    }
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

export { Counter };

import styles from "./Counter.local.css";
import { Component } from "../Prototype/Component.js";

class Counter extends Component {
  constructor(container) {
    super(container);
    this.counter = 0;
    this._bindHandler("click", this._incrementCounter.bind(this));
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

  _incrementCounter(e) {
    
    let styledItems = Object.values(styles);
    if (styledItems.includes(e.target.className)) {
      this.counter++;
      this.render();
    }
  }
}

export { Counter };

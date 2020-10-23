import styles from "./FoodMenu.local.css";
import { Component } from "../Prototype/Component.js";

class FoodMenu extends Component {
  constructor(container, props) {
    super(container);
    this.props = props;
  }

  _updateOutputElement() {
    this.outputElement.className = styles["menu"];
    let outputHTML = "";

    for (let menuCategory in this.props) {
      outputHTML += `<div class=${styles["menu-category"]}>${menuCategory}</div>`;

      this.props[menuCategory].forEach((menuItem) => {
        outputHTML += `<div class=${styles["menu-item"]}>
                       <h1>${menuItem.name}</h1>
                       <h2>${menuItem.price}</h2>
                       <p>${menuItem.description}</p>`;
      });
    }
    this.outputElement.innerHTML = outputHTML;
  }
}

export { FoodMenu };

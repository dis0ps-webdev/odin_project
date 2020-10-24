import styles from "./Title.local.css";
import { Component } from "../Prototype/Component.js";

class Title extends Component {
  constructor(container, props) {
    super(container);
    this.props = props;
  }

  _updateOutputElement() {
    this.outputElement.className = styles["title-container"];
    this.outputElement.innerHTML = `<h1 style="color:${this.props.color}">${this.props.text}</h1>`;
  }
}

export { Title };

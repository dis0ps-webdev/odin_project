import styles from "./TextBlock.local.css";
import { Component } from "../Prototype/Component.js";

class TextBlock extends Component {
  constructor(container, props) {
    super(container);
    this.props = props;
  }

  _updateOutputElement() {
    this.outputElement.className = styles["textblock-container"];
    this.outputElement.innerHTML = `<p style="color: ${this.props.color};">${this.props.text}</p>`;
  }
}

export { TextBlock };

import styles from "./ImageElement.local.css";
import { Component } from "../Prototype/Component.js";

class ImageElement extends Component {
  constructor(container, props) {
    super(container);
    this.props = props;
  }

  _updateOutputElement() {
    this.outputElement.className = styles["image-container"];
    this.outputElement.innerHTML = `<img style="width: ${this.props.size};" src="${this.props.url}" alt="${this.props.alt}" />`;
  }
}

export { ImageElement };

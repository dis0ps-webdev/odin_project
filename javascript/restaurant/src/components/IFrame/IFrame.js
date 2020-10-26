import styles from "./IFrame.local.css";
import { Component } from "../Prototype/Component.js";

class IFrame extends Component {
  constructor(container, props) {
    super(container);
    this.props = props;
  }

  _updateOutputElement() {
    this.outputElement.className = styles["iframe-container"];
    this.outputElement.innerHTML = `<iframe width="${this.props.width}" height="${this.props.height}" frameborder=0 src="${this.props.src}"></iframe>`;
  }
}

export { IFrame };

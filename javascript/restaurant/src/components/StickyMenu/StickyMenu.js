import styles from "./StickyMenu.local.css";
import { Component } from "../Prototype/Component.js";

class StickyMenu extends Component {
  constructor(container, props) {
    super(container);

    this.navOriginalPosition = container.offsetTop;
    this.navigationContent = props;

    this._bindWindowHandler("scroll", this._makeSticky.bind(this));
  }

  _updateOutputElement() {
    if (this.navigationContent != undefined) {
      this.outputElement.className = styles["nav-wrapper"];
      let menuItems = "";
      for (let link in this.navigationContent.links) {
        let href = this.navigationContent.links[link];
        menuItems += `<li><a id="${link}" href="${href}">${link}</a></li>`;
      }
      this.outputElement.innerHTML = `
      <nav class=${styles["nav-content"]}>
        <ul>
        <li><img class=${styles["nav-logo"]} src="${this.navigationContent.logo}" /></li>
        ${menuItems}
        </ul>
      </nav>
    </div>
    `;
    }
  }

  _makeSticky() {
    if (this.domLocation.offsetTop < window.pageYOffset) {
      this.domLocation.classList.add(styles["sticky"]);
    }
    if (window.pageYOffset < this.navOriginalPosition) {
      this.domLocation.classList.remove(styles["sticky"]);
    }
  }
}

export { StickyMenu };

import styles from "./StickyMenu.local.css";

class StickyMenu {
  constructor(container, props) {
    this.targetContainer = container;
    this.navOriginalPosition = container.offsetTop;
    this.domReference = null;

    this.navigationContent = props;

    this.outputElement = document.createElement("div");
    this._bindClick();
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

  _bindClick() {
    this.outputElement.addEventListener("click", this._handleClick.bind(this));
    window.addEventListener("scroll", this._makeSticky.bind(this));
  }

  _makeSticky() {
    if (this.domReference.offsetTop < window.pageYOffset) {
      this.domReference.classList.add(styles["sticky"]);
    }
    if (window.pageYOffset < this.navOriginalPosition) {
      this.domReference.classList.remove(styles["sticky"]);
    }
  }

  _handleClick(e) {
    let clickedItem = e.target.id;
    console.log(clickedItem);
  }

  render() {
    this._updateOutputElement();
    if (this.domReference != null) {
      this.domReference.innerHTML = this.outputElement.innerHTML;
    } else {
      this.targetContainer.append(this.outputElement);
      this.domReference = this.targetContainer.lastChild;
    }
  }
}

export { StickyMenu };

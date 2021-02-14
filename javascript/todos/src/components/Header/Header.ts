import styles from "./Header.local.scss";
import { Component } from "../Prototype/Component";
import { PubSub } from "../../app/pubsub/PubSub";

class Header extends Component {
  private refPubSub: PubSub;

  constructor(container: Element, pubsub: PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;
      console.log(targetClick.id);
    }
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["header"];
    this.outputElement.innerHTML = `
        <div class=${styles["logo"]}>
          <img src="images/clipboard_icon.svg" alt="Todo List" srcset="" />
          <span>Can-Do Kanban</span>
        </div>
        <div class=${styles["list-control"]}>
          <img id="left-arrow" src="images/left_arrow.svg" alt="" srcset="" />
          <span>Todo</span>
          <img id="right-arrow" src="images/right_arrow.svg" alt="" srcset="" />
        </div>
    `;
  }
}

export { Header };

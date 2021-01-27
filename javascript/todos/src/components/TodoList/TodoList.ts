import styles from "./TodoList.local.scss";
import { Component } from "../Prototype/Component";
import { PubSub } from "../../app/pubsub/PubSub";

class TodoList extends Component {
  private refPubSub: PubSub;

  constructor(container: Element, pubsub: PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;

      console.log(targetClick.closest(`.${styles["list-item"]}`));
    }
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["list"];
    this.outputElement.innerHTML = `
    <div id="guid" class=${styles["list-item"]}>
      <div class=${styles["item-highlight-high"]}></div>
      <div class=${styles["item-content"]}>
        <span>Take out garbage</span>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Voluptates itaque optio esse fugiat commodi et error nam
          consectetur dolorum maiores saepe possimus debitis, quasi
          voluptatibus nostrum, quibusdam sit eum! Illo.</span>
        <span>Due: 01/03/2021</span>
      </div>
    `;
  }
}

export { TodoList };

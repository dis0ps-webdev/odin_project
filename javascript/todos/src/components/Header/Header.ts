import styles from "./Header.local.scss";
import { Component } from "../Prototype/Component";
import * as app from "../../app/App";

class Header extends Component {
  private refPubSub: app.PubSub;
  private numInView: number;
  private currentStatusView: app.enumStatus = app.enumStatus.Todo;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this.numInView = 0;
    this._bindHandler("click", this.handleClick.bind(this));
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_VIEWS,
      this.handleUpdateView.bind(this)
    );
  }

  private handleUpdateView(data: app.ProjectList) {
    let currentProject = data.getCurrentProject();
    this.currentStatusView = data.getCurrentStatusView();
    if (currentProject) {
      this.numInView = currentProject
        .getData()
        .arrTodo.filter(
          (todo) => todo.getData().status == this.currentStatusView
        ).length;
    }
    this._updateOutputElement();
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;
      switch (targetClick.id) {
        case "right-arrow":
          this.changeListFilter(1);
          break;
        case "left-arrow":
          this.changeListFilter(-1);
          break;
      }
    }
  }

  private changeListFilter(increment_value: number) {
    const statusIndex = this.currentStatusView + increment_value;
    const enumLength =
      Object.keys(app.enumStatus).filter((key) => isNaN(Number(key))).length -
      1;
    if (statusIndex >= 0 && statusIndex <= enumLength) {
      this.currentStatusView = statusIndex;
      this._updateOutputElement();
      this.refPubSub.publish(
        app.enumEventMessages.CHANGE_LIST_FILTER,
        this.currentStatusView
      );
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
          <span>${app.enumStatus[this.currentStatusView]} (${
      this.numInView
    })</span>
          <img id="right-arrow" src="images/right_arrow.svg" alt="" srcset="" />
        </div>
    `;
  }
}

export { Header };

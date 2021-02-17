import styles from "./TodoEdit.local.scss";
import { Component } from "../Prototype/Component";
import * as app from "../../app/App";

class TodoEdit extends Component {
  private refPubSub: app.PubSub;
  private currentTodo: app.TodoData;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this.currentTodo = new app.TodoData();
    this._bindHandler("click", this.handleClick.bind(this));
    this.refPubSub.subscribe(
      app.enumEventMessages.LOAD_TODO,
      this.loadTodo.bind(this)
    );
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;
      console.log(targetClick.id);
      switch (targetClick.id) {
        case "save-button":
          this.saveTodo();
          break;
      }
    }
  }

  private saveTodo() {
    let titleText = <HTMLInputElement>(
      this.targetContainer.querySelector("#title-text")
    );
    if (titleText) {
      this.currentTodo.name = titleText.value;
    }
    this.refPubSub.publish(app.enumEventMessages.UPDATE_TODO, this.currentTodo);
    this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);
  }

  private loadTodo(dataObject: app.TodoData) {
    this.currentTodo = dataObject;
    let titleText = <HTMLInputElement>(
      this.targetContainer.querySelector("#title-text")
    );
    if (titleText) {
      titleText.value = dataObject.name;
    }
  }

  private generateOptionsFromEnum(targetEnum: any) {
    let valueList = Object.keys(targetEnum).filter(
      (key) => !isNaN(Number(targetEnum[key]))
    );

    let prioritySelectHTML: string = "";
    for (let valueItem in valueList) {
      prioritySelectHTML += `<option value="${valueItem}">${targetEnum[valueItem]}</option>`;
    }

    return prioritySelectHTML;
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["edit-task"];
    this.outputElement.innerHTML = `
    <div class=${styles["edit-task-content"]}>
      <label for="title">Title</label>
      <input type="text" name="title" id="title-text" />
      <label for="Description">Description</label>
      <input type="text" name="description" id="description-text" />
      <label for="Status">Status</label>
      <select name="status" id="status-select">
      ${this.generateOptionsFromEnum(app.enumStatus)}
      </select>
      <label for="Priority">Priority</label>
      <select name="priority" id="priority-select">
      ${this.generateOptionsFromEnum(app.enumPriorities)}
      </select>
      <label for="due-date">Due Date</label>
      <input type="text" name="due-date" id="due-date" />
      <button id="save-button">Save</button>
    </div>
    `;
  }
}

export { TodoEdit };

import styles from "./TodoList.local.scss";
import { Component } from "../Prototype/Component";
import { PubSub } from "../../app/pubsub/PubSub";
import { Project } from "../../app/model/Project";
import { format } from "date-fns";
import * as app from "../../app/App";

class TodoList extends Component {
  private refPubSub: PubSub;
  private currentProject: Project;

  constructor(container: Element, pubsub: PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this.currentProject = new Project();
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_PROJECT,
      this.handleProjectUpdate.bind(this)
    );
    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleProjectUpdate(data: any) {
    this.currentProject = <Project>data;
    this._updateOutputElement();
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;

      console.log(targetClick.closest(`.${styles["list-item"]}`));
    }
  }

  protected _updateOutputElement() {
    const projectData = this.currentProject.getData();
    this.outputElement.className = styles["list"];
    this.outputElement.innerHTML = "";
    projectData.arrTodo.forEach((objTodo) => {
      const todoItem = objTodo.getData();
      const dueDate = format(todoItem.dueDate, "MMMM do, yyyy");
      const priorityLevel = `item-highlight-${app.enumPriorities[todoItem.priority]}`.toLowerCase();
      console.log(priorityLevel)
      this.outputElement.innerHTML += `
      <div id="${todoItem.id}" class=${styles["list-item"]}>
        <div class=${styles[priorityLevel]}></div>
        <div class=${styles["item-content"]}>
          <span>${todoItem.name}</span>
          <span>${todoItem.description}</span>
          <span>Due: ${dueDate}</span>
        </div>
      </div>
    `;
    });
  }
}

export { TodoList };

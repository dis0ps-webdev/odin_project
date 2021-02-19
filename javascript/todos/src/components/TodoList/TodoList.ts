import styles from "./TodoList.local.scss";
import { Component } from "../Prototype/Component";
import * as app from "../../app/App";
import { format } from "date-fns";

class TodoList extends Component {
  private refPubSub: app.PubSub;
  private currentProject: app.Project;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_VIEWS,
      this.handleUpdateView.bind(this)
    );
    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleUpdateView(data: app.Project) {
    this.currentProject = data;
    this._updateOutputElement();
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;
      let clickedTodo = targetClick.closest(`.${styles["list-item"]}`);
      if (clickedTodo) {
        this.refPubSub.publish(
          app.enumEventMessages.SET_CURRENT_TODO,
          clickedTodo.id
        );
        this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_EDIT, null);
      }
    }
  }

  private filterTodos(): app.Todo[] {
    const projectData = this.currentProject.getData();
    const arrTodo = projectData.arrTodo;
    const currentStatusView = projectData.currentStatusView;

    return arrTodo
      .filter((todo) => todo.getData().status == currentStatusView)
      .sort(
        (todo1, todo2) => todo2.getData().priority - todo1.getData().priority
      );
  }

  protected _updateOutputElement() {
    console.log(app.enumStatus[3]);
    this.outputElement.className = styles["list"];
    this.outputElement.innerHTML = "";
    this.filterTodos().forEach((objTodo) => {
      const todoItem = objTodo.getData();
      const dueDate = format(todoItem.dueDate, "MMMM do, yyyy");
      const priorityLevel = `item-highlight-${
        app.enumPriorities[todoItem.priority]
      }`.toLowerCase();
      this.outputElement.innerHTML += `
      <div id="${todoItem.id}" class=${styles["list-item"]}>
        <div class=${styles[priorityLevel]}></div>
        <div class=${styles["item-content"]}>
          <span>${todoItem.title}</span>
          <span>${todoItem.description}</span>
          <span>Due: ${dueDate}</span>
        </div>
      </div>
    `;
    });
  }
}

export { TodoList };

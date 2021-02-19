import styles from "./Footer.local.scss";
import { Component } from "../Prototype/Component";
import * as app from "../../app/App";

class Footer extends Component {
  private refPubSub: app.PubSub;
  private currentProject: app.Project;
  private numTodos: number = 0;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.refPubSub = pubsub;
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_VIEWS,
      this.handleUpdateView.bind(this)
    );
    this._bindHandler("click", this.handleClick.bind(this));
    this._bindHandler("change", this.handleChange.bind(this));
  }

  private handleUpdateView(data: app.Project) {
    this.currentProject = data;
    this.numTodos = data.getData().arrTodo.length;
    this._updateOutputElement();
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;

      switch (targetClick.id) {
        case "add-button":
          this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_EDIT, null);
          break;
        case "settings-button":
          this.refPubSub.publish(
            app.enumEventMessages.CHANGE_VIEW_SETTINGS,
            null
          );
      }
    }
  }

  private handleChange(e: Event) {
    const targetSelect = e.target as HTMLInputElement;
    console.log(`Change: ${targetSelect.value}`);
    this.refPubSub.publish(
      app.enumEventMessages.CHANGE_PROJECT,
      targetSelect.value
    );
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["footer"];
    this.outputElement.innerHTML = `
    <div class=${styles["top-footer"]}>
      <span>Total Todos: ${this.numTodos}</span>
      <img id="add-button" src="images/add_item_icon.svg" alt="Add Item" srcset="" />
    </div>

    <div class=${styles["bottom-footer"]}>
      <select id="project-select" name="project" id="project-select">
        <option value="Default">Default</option>
        <option value="Project_1">Project 1</option>
        <option value="Project_2">Project 2</option>
      </select>
      <img id="settings-button" src="images/settings_icon.svg" alt="Settings" srcset="" />
    </div>
    `;
  }
}

export { Footer };

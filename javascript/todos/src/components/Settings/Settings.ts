import styles from "./Settings.local.scss";
import { Component } from "../Prototype/Component";
import * as app from "../../app/App";

class Settings extends Component {
  private refPubSub: app.PubSub;
  private currentProject: app.Project;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.refPubSub = pubsub;

    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;
      switch (targetClick.id) {
        case "add-button":
          break;
        case "delete-button":
          break;
        case "cancel-button":
          this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);
          break;
      }
    }
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["settings"];
    this.outputElement.innerHTML = `
      <h1>Settings</h1>

      <label for="title">Add Project</label>
      <input type="text" name="title" id="title" placeholder="Project Name"/>
      <button type="button" id="add-button">Add Project</button>

      <label for="title">Remove Project</label>
      <input type="text" name="confirm-delete" id="confirm-delete" placeholder="Type DELETE to confirm"/>
      <button type="button" id="delete-button">Delete Current</button>

      <button type="button" id="cancel-button">Cancel</button>

    `;
  }
}

export { Settings };

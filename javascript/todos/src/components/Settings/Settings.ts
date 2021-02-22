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
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_VIEWS,
      this.handleUpdateView.bind(this)
    );
  }

  private handleUpdateView(data: app.ProjectList) {
    const loadedProject = data.getCurrentProject();
    if (loadedProject) {
      this.currentProject = loadedProject;
    }
  }

  private handleClick(e: Event) {
    if (e.target) {
      const targetClick = e.target as HTMLElement;
      switch (targetClick.id) {
        case "add-button":
          this.handleAddProject();
          break;
        case "delete-button":
          this.handleDeleteProject();
          break;
        case "cancel-button":
          this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);
          break;
      }
    }
  }

  private handleAddProject() {
    let projectTemplate = app.Factory.createProjectTemplate();
    let titleElement = <HTMLInputElement>(
      this.targetContainer.querySelector("#title")
    );
    if (titleElement) {
      if (titleElement.value !== "") {
        projectTemplate.name = titleElement.value;
        this.refPubSub.publish(
          app.enumEventMessages.ADD_PROJECT,
          projectTemplate
        );
        this.refPubSub.publish(
          app.enumEventMessages.CHANGE_PROJECT,
          projectTemplate.id
        );
        this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);
      }
    }
  }
  private handleDeleteProject() {
    const titleElement = <HTMLInputElement>(
      this.targetContainer.querySelector("#confirm-delete")
    );

    const currentProjectData = this.currentProject.getData();

    if (titleElement) {
      if (
        titleElement.value == "DELETE" &&
        currentProjectData.name != "Default"
      ) {
        this.refPubSub.publish(
          app.enumEventMessages.DELETE_PROJECT,
          currentProjectData.id
        );
        this.refPubSub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);
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

      <label for="title">Remove Project (<span class=${styles["warning"]}>Cannot Delete Default Project</span>)</label>
      <input type="text" name="confirm-delete" id="confirm-delete" placeholder="Type DELETE to confirm"/>
      <button type="button" id="delete-button">Delete Current</button>


      <button type="button" id="cancel-button">Cancel</button>

    `;
  }
}

export { Settings };

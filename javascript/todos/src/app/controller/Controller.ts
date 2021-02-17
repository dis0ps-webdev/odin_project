import * as app from "../App";

export class Controller {
  private refPubSub: app.PubSub;
  private currentProject: app.Project;

  constructor(pubsub: app.PubSub) {
    this.refPubSub = pubsub;
    let projectData = app.Factory.createProjectTemplate();
    this.currentProject = app.Factory.createProject(projectData);
    this.subscribeHandlers();

    let defaultProject = this.getDefaultProject();
    this.handleChangeProject(defaultProject);
  }

  private getDefaultProject(): app.Project {
    let defaultProject = app.Factory.createProjectTemplate();
    defaultProject.name = "Default";
    defaultProject.dueDate = new Date();
    return app.Factory.createProject(defaultProject);
  }

  private subscribeHandlers() {
    this.refPubSub.subscribe(
      app.enumEventMessages.CHANGE_PROJECT,
      this.handleChangeProject.bind(this)
    );
    this.refPubSub.subscribe(
      app.enumEventMessages.ADD_PROJECT,
      this.handleAddProject.bind(this)
    );
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_PROJECT,
      this.handleUpdateProject.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.ADD_TODO,
      this.handleAddTodo.bind(this)
    );
    this.refPubSub.subscribe(
      app.enumEventMessages.UPDATE_TODO,
      this.handleUpdateTodo.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.SAVE_APP_STATE,
      this.handleSaveAppState.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.LOAD_APP_STATE,
      this.handleLoadAppState.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.PAGE_LOADED,
      this.handlePageLoaded.bind(this)
    );
  }

  private handleAddProject(dataObject: app.ProjectData) {
    this.currentProject = app.Factory.createProject(dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.currentProject
    );
  }
  private handleUpdateProject(dataObject: app.ProjectData) {
    this.currentProject.updateData(dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.currentProject
    );
  }
  private handleChangeProject(objProject: app.Project) {
    this.currentProject = objProject;
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.currentProject
    );
  }

  private handleAddTodo(dataObject: app.TodoData) {
    this.currentProject.addTodoItem(dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.currentProject
    );
  }
  private handleUpdateTodo(dataObject: app.TodoData) {
    this.currentProject.updateTodoItem(dataObject.id, dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.currentProject
    );
  }

  private handleLoadAppState() {}
  private handleSaveAppState() {}

  private handlePageLoaded() {
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.currentProject
    );
  }
}

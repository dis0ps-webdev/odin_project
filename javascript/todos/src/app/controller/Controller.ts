import * as app from "../App";

export class Controller {
  private refPubSub: app.PubSub;
  private appProjectList: app.ProjectList;
  private currentProject: app.Project;

  constructor(pubsub: app.PubSub) {
    this.refPubSub = pubsub;
    this.subscribeHandlers();

    if (!this.handleLoadAppState()) {
      let projectListTemplate = app.Factory.createProjectListTemplate();
      this.appProjectList = app.Factory.createProjectList(projectListTemplate);
      this.setDefaultProject();
    }
  }

  private setDefaultProject() {
    let defaultProject = app.Factory.createProjectTemplate();
    defaultProject.id = "default";
    defaultProject.name = "Default";
    this.refPubSub.publish(app.enumEventMessages.ADD_PROJECT, defaultProject);
    this.refPubSub.publish(
      app.enumEventMessages.CHANGE_PROJECT,
      defaultProject.id
    );
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
      app.enumEventMessages.DELETE_PROJECT,
      this.handleDeleteProject.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.SET_CURRENT_TODO,
      this.handleSetTodo.bind(this)
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

    this.refPubSub.subscribe(
      app.enumEventMessages.CHANGE_LIST_FILTER,
      this.handleFilter.bind(this)
    );
  }

  private handleAddProject(dataObject: app.ProjectData) {
    this.appProjectList.addProject(dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
    this.refPubSub.publish(app.enumEventMessages.SAVE_APP_STATE, null);
  }
  private handleUpdateProject(dataObject: app.ProjectData) {
    this.currentProject.updateData(dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
    this.refPubSub.publish(app.enumEventMessages.SAVE_APP_STATE, null);
  }
  private handleDeleteProject(projectId: string) {
    this.appProjectList.removeProject(projectId);
    this.refPubSub.publish(app.enumEventMessages.SAVE_APP_STATE, null);
  }
  private handleChangeProject(projectId: string) {
    this.appProjectList.setCurrentProject(projectId);
    const loadedProject = this.appProjectList.getCurrentProject();
    if (loadedProject) {
      this.currentProject = loadedProject;
      this.refPubSub.publish(app.enumEventMessages.SAVE_APP_STATE, null);
    }

    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
  }

  private handleSetTodo(todoId: string) {
    this.currentProject.setCurrentTodoId(todoId);
  }

  private handleAddTodo(dataObject: app.TodoData) {
    this.currentProject.addTodoItem(dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
    this.refPubSub.publish(app.enumEventMessages.SAVE_APP_STATE, null);
  }
  private handleUpdateTodo(dataObject: app.TodoData) {
    this.currentProject.updateTodoItem(dataObject.id, dataObject);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
    this.handleSaveAppState();
  }

  private reviveAppObjects(data: any) {
    const projectListTemplate = app.Factory.createProjectListTemplate();
    this.appProjectList = app.Factory.createProjectList(projectListTemplate);

    const appData = JSON.parse(data);

    appData.arrProjects.forEach((project: any) => {
      //Store our todo array for object revival, and clear it to avoid duplicates
      let arrTodo = project.data.arrTodo;
      project.data.arrTodo = [];

      let revivedProject = app.Factory.createProject(project.data);

      //Revive the todos within the project
      arrTodo.forEach((todo: any) => {
        revivedProject.addTodoItem(todo.data);
      });

      this.appProjectList.addProject(revivedProject.getData());
    });
    if (appData.currentProject) {
      this.appProjectList.setCurrentProject(appData.currentProject);
    } else {
      this.appProjectList.setCurrentProject("default");
    }
  }

  private handleLoadAppState() {
    const jsonObject = localStorage.getItem("cando-kanban-save");

    if (jsonObject !== null) {
      this.reviveAppObjects(jsonObject);

      let loadedProject = this.appProjectList.getCurrentProject();
      if (loadedProject) {
        this.currentProject = loadedProject;
      }
      return true;
    } else {
      return false;
    }
  }
  private handleSaveAppState() {
    const jsonObject = JSON.stringify(this.appProjectList.getData());
    localStorage.setItem("cando-kanban-save", jsonObject);
  }

  private handlePageLoaded() {
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
  }
  private handleFilter(data: app.enumStatus) {
    this.appProjectList.setCurrentStatusView(data);
    this.refPubSub.publish(
      app.enumEventMessages.UPDATE_VIEWS,
      this.appProjectList
    );
  }
}

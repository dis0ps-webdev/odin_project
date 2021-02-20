import * as app from "../App";

export class ProjectListData {
  public arrProjects: Array<app.Project> = [];
  public currentProject: string;
}

export class ProjectList {
  private data: ProjectListData = new ProjectListData();
  private currentStatusView: app.enumStatus = app.enumStatus.Todo;

  constructor(objData?: ProjectListData) {
    if (objData) {
      this.data = objData;
    }
  }

  public getData() {
    return this.data;
  }

  public setCurrentProject(projectId: string) {
    this.data.currentProject = projectId;
  }

  public getCurrentProject() {
    return this.data.arrProjects.find((project) => {
      return project.verifyId(this.data.currentProject);
    });
  }

  public addProject(objData: app.ProjectData) {
    const newProject = new app.Project(objData);
    this.data.arrProjects.push(newProject);
  }

  public setCurrentStatusView(status: app.enumStatus) {
    this.currentStatusView = status;
  }

  public getCurrentStatusView() {
    return this.currentStatusView;
  }

  public removeProject() {}
}

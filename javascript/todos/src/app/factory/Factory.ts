import { Todo, TodoData } from "../model/Todo";
import { ProjectData, Project } from "../model/Project";
import { ProjectListData, ProjectList } from "../model/ProjectList";

export class Factory {
  public static createTodoTemplate(): TodoData {
    return new TodoData();
  }

  public static createProjectTemplate(): ProjectData {
    return new ProjectData();
  }

  public static createProjectListTemplate(): ProjectListData {
    return new ProjectListData();
  }

  public static createProjectList(dataObject: ProjectListData): ProjectList {
    return new ProjectList(dataObject);
  }

  public static createProject(dataObject: ProjectData): Project {
    return new Project(dataObject);
  }

  public static createTodo(dataObject: TodoData): Todo {
    return new Todo(dataObject);
  }
}

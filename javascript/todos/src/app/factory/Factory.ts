import { Todo, TodoData } from "../model/Todo";
import { ProjectData, Project } from "../model/Project";

export class Factory {
  public static createTodoTemplate(): TodoData {
    return new TodoData();
  }

  public static createProjectTemplate(): ProjectData {
    return new ProjectData();
  }

  public static createProject(dataObject: ProjectData): Project {
    return new Project(dataObject);
  }

  public static createTodo(dataObject: TodoData): Todo {
    return new Todo(dataObject);
  }
}

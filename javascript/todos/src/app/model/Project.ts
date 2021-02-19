import { Model } from "./Prototype/Model";
import { Todo, TodoData } from "./Todo";
import { v4 as uuidv4 } from "uuid";
import * as app from "../App";
import { enumStatus } from "../config/AppConfig";

export class ProjectData {
  public id: string = uuidv4();
  public name: string = "";
  public isDone: boolean = false;
  public arrTodo: Array<Todo> = [];
  public currentTodo: string = "";
  public currentStatusView: app.enumStatus = app.enumStatus.Todo;
  public dueDate: Date = new Date();
}

export class Project {
  private data: ProjectData = new ProjectData();

  constructor(objData?: ProjectData) {
    if (objData !== undefined) {
      this.updateData(objData);
    }
  }

  public getData(): ProjectData {
    return this.data;
  }

  public addTodoItem(dataObject: TodoData) {
    let newTodo = new Todo(dataObject);
    this.data.arrTodo.push(newTodo);
  }

  public getTodoItem(id: string) {
    return this.data.arrTodo.find((todo) => {
      return todo.verifyId(id);
    });
  }

  public setCurrentTodoId(id: string) {
    this.data.currentTodo = id;
  }

  public getCurrentTodoId() {
    return this.data.currentTodo;
  }

  public setCurrentStatusView(status: enumStatus){
    this.data.currentStatusView = status;
  }

  public updateTodoItem(id: string, objData: TodoData) {
    let targetTodo = this.getTodoItem(id);
    if (targetTodo !== undefined) {
      targetTodo.updateData(objData);
    }
  }

  public removeTodoItem(id: string) {
    let index = this.data.arrTodo.findIndex((todo) => {
      todo.verifyId(id);
    });
    this.data.arrTodo.splice(index, 1);
  }

  public updateData(objData: ProjectData) {
    Object.assign(this.data, objData);
  }
}

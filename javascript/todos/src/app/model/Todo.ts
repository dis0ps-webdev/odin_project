import * as app from "../../app/App";
import { v4 as uuidv4 } from "uuid";

interface StringIndex {
  [key: string]: any;
}

export class TodoData implements StringIndex {
  [key: string]: any;
  public id: string = uuidv4();
  public title: string = "";
  public description: string = "";
  public priority: app.enumPriorities = app.enumPriorities.Medium;
  public status: app.enumStatus = app.enumStatus.Todo;
  public dueDate: Date = new Date();
}

class Todo {
  private data: TodoData = new TodoData();

  constructor(objData?: TodoData) {
    if (objData !== undefined) {
      this.updateData(objData);
    }
  }

  public verifyId(id: string) {
    return this.data.id == id ? true : false;
  }

  public getData(): TodoData {
    return this.data;
  }

  public updateData(objData: TodoData) {
    if (typeof objData.dueDate == "string") {
      objData.dueDate = new Date(objData.dueDate);
    }
    Object.assign(this.data, objData);
  }
}

export { Todo };

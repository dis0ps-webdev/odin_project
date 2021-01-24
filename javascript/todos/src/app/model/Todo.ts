import { Model } from "./Prototype/Model";
import { v4 as uuidv4 } from "uuid";

export class TodoData {
  public id: string = uuidv4();
  public name: string = "";
  public isDone: boolean = false;
  public description?: string = "";
  public notes: string = "";
  public arrTodo: Array<Todo> = [];
  public dueDate: Date = new Date();
}

class Todo {
  private data: TodoData = new TodoData();

  constructor(objData?: TodoData) {
    if (objData !== undefined) {
      this.updateData(objData);
    }
  }

  verifyId(id: string) {
    return this.data.id == id ? true : false;
  }

  public getData(): TodoData {
    return this.data;
  }

  public updateData(objData: TodoData) {
    Object.assign(this.data, objData);
  }
}

export { Todo };

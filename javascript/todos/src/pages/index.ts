import * as layout from "../css/layout.global.scss";
import * as typography from "../css/typography.global.scss";
import * as components from "../components/Components";
import * as app from "../app/App";

const global_layout = layout;
const global_typography = typography;

const pubsub = new app.PubSub();

const header = new components.Header(app.containerDiv, pubsub);
const footer = new components.Footer(app.containerDiv, pubsub);
const todoEdit = new components.TodoEdit(app.containerDiv, pubsub);
const todoList = new components.TodoList(app.containerDiv, pubsub);

header.render();
footer.render();
todoList.render();

let project1 = app.Factory.createProjectTemplate();
let thisProject = app.Factory.createProject(project1);

let todo1 = app.Factory.createTodoTemplate();
todo1.name = "Todo 1";
todo1.description = "Todo Description";
todo1.dueDate = new Date();

thisProject.addTodoItem(todo1);

pubsub.publish(app.enumEventMessages.UPDATE_PROJECT, thisProject);

setTimeout(() => {
  let tempTodo = thisProject.getTodoItem(todo1.id);
  if (tempTodo) {
    let tempData = tempTodo.getData();
    tempData.description = "This was updated";
    tempData.priority = app.enumPriorities.High;
    tempTodo.updateData(tempData);
  }
  pubsub.publish(app.enumEventMessages.UPDATE_PROJECT, thisProject);

  for (let i = 0; i <= 10; i++) {
    let todo1 = app.Factory.createTodoTemplate();
    todo1.name = "Todo 1";
    todo1.description = "Todo Description";
    todo1.dueDate = new Date();

    thisProject.addTodoItem(todo1);
    pubsub.publish(app.enumEventMessages.UPDATE_PROJECT, thisProject);
  }
}, 5000);

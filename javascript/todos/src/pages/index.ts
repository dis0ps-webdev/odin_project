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

const controller = new app.Controller(pubsub);

let todo1 = app.Factory.createTodoTemplate();
todo1.name = "Todo 1";
todo1.description = "Todo Description";
todo1.dueDate = new Date();

pubsub.publish(app.enumEventMessages.ADD_TODO, todo1);
pubsub.publish(app.enumEventMessages.ADD_TODO, todo1);
setTimeout(() => {
  pubsub.publish(app.enumEventMessages.ADD_TODO, todo1);
}, 5000);

import * as layout from "../css/layout.global.scss";
import * as typography from "../css/typography.global.scss";
import * as config from "../app/config/AppConfig";
import * as components from "../components/Components";
import { PubSub } from "../app/pubsub/PubSub";
import { Project, ProjectData } from "../app/model/Project";
import { Todo, TodoData } from "../app/model/Todo";

const global_layout = layout;
const global_typography = typography;

const pubsub = new PubSub();

const header = new components.Header(config.containerDiv, pubsub);
const footer = new components.Footer(config.containerDiv, pubsub);
const todoList = new components.TodoList(config.containerDiv, pubsub);

const testProject = new Project();
const td1 = new TodoData();

td1.name = "Todo 1";
td1.description = "Todo Description";
td1.dueDate = new Date();

const objTodo1 = new Todo(td1);

const td2 = new TodoData();

td2.name = "Todo 2";
td2.description = "Todo Description";
td2.dueDate = new Date();

const objTodo2 = new Todo(td2);

const td3 = new TodoData();

td3.name = "fiona";
td3.description = "uuu45uu6uu8rrfuguuuurg6errh";
td3.dueDate = new Date();

const objTodo3 = new Todo(td3);

header.render();
footer.render();

todoList.render();

testProject.addTodoItem(objTodo1);
pubsub.publish(config.enumEventMessages.UPDATED_PROJECT, testProject);

testProject.addTodoItem(objTodo2);
pubsub.publish(config.enumEventMessages.UPDATED_PROJECT, testProject);

const testTimeout = setTimeout(() => {
  testProject.addTodoItem(objTodo3);
  pubsub.publish(config.enumEventMessages.UPDATED_PROJECT, testProject);
}, 5000);

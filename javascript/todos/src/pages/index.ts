import * as layout from "../css/layout.global.scss";
import * as typography from "../css/typography.global.scss";
import * as imports from "../css/imports.global.scss";
import * as app from "../app/App";

const global_layout = layout;
const global_typography = typography;
const global_imports = imports;

const pubsub = new app.PubSub();

const controller = new app.Controller(pubsub);
const router = new app.PageRouter(app.containerDiv, pubsub);

pubsub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);

let todo1 = app.Factory.createTodoTemplate();
todo1.title = "Todo 1";
todo1.description = "Todo Description";
todo1.dueDate = new Date();

let todo2 = app.Factory.createTodoTemplate();
todo2.title = "Todo 2";
todo2.description = "Todo Description";
todo2.dueDate = new Date();

pubsub.publish(app.enumEventMessages.ADD_TODO, todo1);
pubsub.publish(app.enumEventMessages.ADD_TODO, todo2);

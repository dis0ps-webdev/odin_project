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

header.render();
footer.render();

todoList.render();
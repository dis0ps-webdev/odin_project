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

let test = app.Factory.createProjectTemplate();
test.name = "Testing";
//pubsub.publish(app.enumEventMessages.ADD_PROJECT, test);
pubsub.publish(app.enumEventMessages.CHANGE_VIEW_LIST, null);

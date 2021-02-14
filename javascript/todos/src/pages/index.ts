import * as layout from "../css/layout.global.scss";
import * as typography from "../css/typography.global.scss";
import * as config from "../app/config/AppConfig";
import * as components from "../components/Components";
import { PubSub } from "../app/pubsub/PubSub";

const global_layout = layout;
const global_typography = typography;

const pubsub = new PubSub();

const header = new components.Header(config.containerDiv, pubsub);
const footer = new components.Footer(config.containerDiv, pubsub);
const todoEdit = new components.TodoEdit(config.containerDiv, pubsub);

header.render();
footer.render();

todoEdit.render();

import layout from "../css/layout.global.css";
import typography from "../css/typography.global.css";
import { Router } from "./Router.js";
import * as config from "../config/AppConfig.js";

const router = new Router(config.containerDiv, config.routeMapping);

//Default location
document.location.hash = "#about";

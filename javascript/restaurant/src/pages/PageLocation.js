import { Page } from "./Prototype/Page.js";
import * as config from "../config/AppConfig.js";

class PageLocation extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.createNavigation(config.ourLogo, config.navLinks)
    );
  }
}

export { PageLocation };

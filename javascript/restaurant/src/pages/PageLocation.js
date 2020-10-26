import { Page } from "./Prototype/Page.js";
import * as config from "../config/ComponentConfig.js";

class PageLocation extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.addNavigation(config.ourLogo, config.navLinks)
    );
  }
}

export { PageLocation };

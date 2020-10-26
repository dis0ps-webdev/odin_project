import { Page } from "./Prototype/Page.js";
import * as config from "../config/ComponentConfig.js";

class PageMenu extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.addNavigation(config.ourLogo, config.navLinks)
    );
    this._addComponent(this.componentFactory.addTitle("Our Menu", "#ffffff"));
    this._addComponent(
      this.componentFactory.addSlideshow(8, config.slideShowImages)
    );
    this._addComponent(this.componentFactory.addFoodMenu(config.ourMenu));
  }
}

export { PageMenu };

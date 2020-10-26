import { Page } from "./Prototype/Page.js";
import * as config from "../config/AppConfig.js";

class PageMenu extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.createNavigation(config.ourLogo, config.navLinks)
    );
    this._addComponent(this.componentFactory.createTitle("Our Menu", "#ffffff"));
    this._addComponent(
      this.componentFactory.createSlideshow(8, config.slideShowImages)
    );
    this._addComponent(this.componentFactory.createFoodMenu(config.ourMenu));
  }
}

export { PageMenu };

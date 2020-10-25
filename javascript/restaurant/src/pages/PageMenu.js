import { Page } from "./Prototype/Page.js";
import * as helpers from "../helpers/ComponentHelpers.js";
import * as config from "../config/ComponentConfig.js";

class PageMenu extends Page {
  constructor(container) {
    super(container);
    this._addComponent(helpers.addNavigation(config.ourLogo, config.navLinks));
    this._addComponent(helpers.addTitle("Our Menu", "#ffffff"));
    this._addComponent(helpers.addSlideshow(8, config.slideShowImages));
    this._addComponent(helpers.addFoodMenu(config.ourMenu));
  }
}

export { PageMenu };

import { Page } from "./Prototype/Page.js";
import * as config from "../config/ComponentConfig.js";

class PageAbout extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.addNavigation(config.ourLogo, config.navLinks)
    );
    this._addComponent(
      this.componentFactory.addImage(config.ourLogo, "Cask n Grill Logo", "50%")
    );

    let welcomeMessage =
      "Welcome to the Cask n' Grill restaurant.  We aim to provide the freshest ingredients, prepared simply and honestly.  We believe the simplest preparations are the best, whether it's fine foods or fine spirits.  When you're here, you're home.";

    this._addComponent(
      this.componentFactory.addTextBlock(welcomeMessage, "#ffffff")
    );

    this._addComponent(
      this.componentFactory.addTitle("Hours of Operation", "#ffffff")
    );

    let hoursOfOperation = `Tuesday - Saturday: 4:00 PM - 10:00 PM <br/> Sunday, Monday: Closed`;

    this._addComponent(
      this.componentFactory.addTextBlock(hoursOfOperation, "#ffffff")
    );
  }
}

export { PageAbout };

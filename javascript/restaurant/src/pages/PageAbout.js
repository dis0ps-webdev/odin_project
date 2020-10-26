import { Page } from "./Prototype/Page.js";
import * as config from "../config/AppConfig.js";

class PageAbout extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.createNavigation(config.ourLogo, config.navLinks)
    );
    this._addComponent(
      this.componentFactory.createImage(
        config.ourLogo,
        "Cask n Grill Logo",
        "50%"
      )
    );

    let welcomeMessage =
      "Welcome to the Cask n' Grill restaurant.  We aim to provide the freshest ingredients, prepared simply and honestly.  We believe the simplest preparations are the best, whether it's fine foods or fine spirits.  When you're here, you're home.";

    this._addComponent(
      this.componentFactory.createTextBlock(welcomeMessage, "#ffffff")
    );
  }
}

export { PageAbout };

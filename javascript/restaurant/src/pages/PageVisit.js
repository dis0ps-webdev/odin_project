import { Page } from "./Prototype/Page.js";
import * as config from "../config/AppConfig.js";

class PageVisit extends Page {
  constructor(container) {
    super(container);
    this._addComponent(
      this.componentFactory.createNavigation(config.ourLogo, config.navLinks)
    );
    this._addComponent(this.componentFactory.createTitle("Phone", "#ffffff"));

    let phoneNumber = `+1 555-555-5555`;

    this._addComponent(
      this.componentFactory.createTextBlock(phoneNumber, "#ffffff")
    );

    this._addComponent(
      this.componentFactory.createTitle("Hours of Operation", "#ffffff")
    );

    let hoursOfOperation = `Tuesday - Saturday: 4:00 PM - 10:00 PM <br/> Sunday, Monday: Closed`;

    this._addComponent(
      this.componentFactory.createTextBlock(hoursOfOperation, "#ffffff")
    );
  }
}

export { PageVisit };

import * as app from "../../app/App";
import { PubSub } from "../../app/App";

export class Page {
  protected outputElement: Element;
  protected refPubSub: app.PubSub;
  protected componentList: any[];

  constructor(container: any, pubsub: PubSub) {
    this.outputElement = container;
    this.refPubSub = pubsub;
    this.componentList = [];
  }

  protected clearContainer() {
    while (this.outputElement.firstChild) {
      this.outputElement.removeChild(this.outputElement.firstChild);
    }
  }

  public addComponent(componentObject: any) {
    this.componentList.push(componentObject);
  }

  public render() {
    this.clearContainer();
    this.componentList.forEach((component) => component.render());
  }
}

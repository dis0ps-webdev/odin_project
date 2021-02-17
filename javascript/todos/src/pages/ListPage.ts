import * as app from "../app/App";
import * as components from "../components/Components";
import { Page } from "./Prototype/Page";

export class ListPage extends Page {
  constructor(container: any, pubsub: app.PubSub) {
    super(container, pubsub);
    this.setupPage();
  }

  private setupPage() {
    const header = new components.Header(app.containerDiv, this.refPubSub);
    const footer = new components.Footer(app.containerDiv, this.refPubSub);
    const todoList = new components.TodoList(app.containerDiv, this.refPubSub);

    this.addComponent(header);
    this.addComponent(footer);
    this.addComponent(todoList);
    
    this.refPubSub.publish(app.enumEventMessages.PAGE_LOADED, null);
  }
}

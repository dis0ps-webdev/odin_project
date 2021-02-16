import * as app from "../app/App";
import * as components from "../components/Components";
import { Page } from "./Prototype/Page";

export class EditPage extends Page {
  constructor(container: any, pubsub: app.PubSub) {
    super(container, pubsub);
    this.setupPage();
  }

  private setupPage() {
    const header = new components.Header(app.containerDiv, this.refPubSub);
    const footer = new components.Footer(app.containerDiv, this.refPubSub);
    const todoEdit = new components.TodoEdit(app.containerDiv, this.refPubSub);

    this.addComponent(header);
    this.addComponent(footer);
    this.addComponent(todoEdit);
  }
}

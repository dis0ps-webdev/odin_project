import * as app from "../App";
import * as pages from "../../pages/Pages";

export class PageRouter {
  private targetElement: Element;
  private refPubSub: app.PubSub;

  constructor(container: Element, pubsub: app.PubSub) {
    this.targetElement = container;
    this.refPubSub = pubsub;

    this.subscribePageEvents();
  }

  private subscribePageEvents() {
    this.refPubSub.subscribe(
      app.enumEventMessages.CHANGE_VIEW_EDIT,
      this.loadEditPage.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.CHANGE_VIEW_LIST,
      this.loadListPage.bind(this)
    );

    this.refPubSub.subscribe(
      app.enumEventMessages.CHANGE_VIEW_SETTINGS,
      this.loadSettingsPage.bind(this)
    );
  }

  private loadEditPage(dataObject: app.TodoData | null) {
    let currentPage = new pages.EditPage(this.targetElement, this.refPubSub);
    currentPage.render();
  }

  private loadListPage() {
    let currentPage = new pages.ListPage(this.targetElement, this.refPubSub);
    currentPage.render();
  }

  private loadSettingsPage() {
    let currentPage = new pages.SettingsPage(this.targetElement, this.refPubSub);
    currentPage.render();
  }
}

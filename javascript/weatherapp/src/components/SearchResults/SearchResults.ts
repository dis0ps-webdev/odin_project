import * as app from "../../app/App";
import { Component } from "../Prototype/Component";

export class SearchResults extends Component {
  private pubsub: app.PubSub;
  private arrLocations: Array<app.LocationData>;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.pubsub = pubsub;
    this.arrLocations = new Array<app.LocationData>();
    this.pubsub.subscribe(
      app.enumEventMessages.UPDATE_SEARCH_COMPONENTS,
      this.updateLocations.bind(this)
    );
  }

  private updateLocations(data: Array<app.LocationData>) {
    this.arrLocations = data;
    this.render();
  }

  protected _updateOutputElement() {
    //this.outputElement.className = ;
    this.outputElement.innerHTML = "<ul>";

    this.arrLocations.forEach((location: any) => {
      let region = location.region != undefined ? location.region : "";
      this.outputElement.innerHTML += `<li>${location.city}, ${region} ${location.country}</li>`;
    });

    this.outputElement.innerHTML += "</ul>";
  }
}

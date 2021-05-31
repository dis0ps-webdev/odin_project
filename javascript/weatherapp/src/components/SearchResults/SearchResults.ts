import * as app from "../../app/App";
import styles from "./SearchResults.local.scss";
import { Component } from "../Prototype/Component";

export class SearchResults extends Component {
  private pubsub: app.PubSub;
  private arrLocations: Array<app.LocationData>;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.pubsub = pubsub;
    this.arrLocations = new Array<app.LocationData>();
    this.pubsub.subscribe(
      app.enumEventMessages.UPDATE_SEARCH_RESULTS,
      this.updateLocations.bind(this)
    );

    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleClick(e: Event) {
    let targetElement = <HTMLFormElement>e.target;
    if (targetElement) {
      if (targetElement.tagName == "LI") {
        let selectedLocation = this.arrLocations[targetElement.value];
        this.pubsub.publish(
          app.enumEventMessages.CHOOSE_LOCATION,
          selectedLocation
        );
        this.makeInvisibile();
      }
    }
  }

  private updateLocations(data: Array<app.LocationData>) {
    this.arrLocations = data;
    if (this.arrLocations.length == 1) {
      this.pubsub.publish(
        app.enumEventMessages.CHOOSE_LOCATION,
        this.arrLocations[0]
      );
    } else {
      this.makeVisibile();
    }
  }

  private makeVisibile() {
    this.render();
    this.outputElement.classList.add(styles["visible"]);
  }

  private makeInvisibile() {
    this.render();
    this.outputElement.classList.remove(styles["visible"]);
  }

  private listResults() {
    this.outputElement.innerHTML = `<h1>Choose a Location</h1><ul id="location_select">`;

    this.arrLocations.forEach((location: any) => {
      let region = location.region != undefined ? location.region : "";
      let arrIndex = this.arrLocations.indexOf(location);
      this.outputElement.innerHTML += `<li value="${arrIndex}">${location.city}, ${region} ${location.country}</li>`;
    });

    this.outputElement.innerHTML += "</ul>";
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["searchresults"];
    if (this.arrLocations.length == 0) {
      this.outputElement.innerHTML = `<h1>No locations found</h1>`;
    } else {
      this.listResults();
    }
  }
}

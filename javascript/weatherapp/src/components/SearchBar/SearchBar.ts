import * as app from "../../app/App";
import styles from "./Searchbar.local.scss";
import { Component } from "../Prototype/Component";

export class SearchBar extends Component {
  private pubsub: app.PubSub;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.pubsub = pubsub;
    this._bindHandler("click", this.handleClick.bind(this));
  }

  private handleClick(e: Event) {
    let targetElement = <HTMLElement>e.target;
    let locationName = <HTMLFormElement>(
      app.containerDiv.querySelector("#location_name")
    );

    e.preventDefault();

    switch (targetElement.id) {
      case "search":
        this.pubsub.publish(
          app.enumEventMessages.SEARCH_LOCATIONS,
          locationName.value
        );
        locationName.value = ""
        break;
      case "metric":
        this.pubsub.publish(
          app.enumEventMessages.TOGGLE_UNITS,
          app.units.METRIC
        );
        break;
      case "imperial":
        this.pubsub.publish(
          app.enumEventMessages.TOGGLE_UNITS,
          app.units.IMPERIAL
        );
        break;
    }
  }

  protected _updateOutputElement() {
    this.outputElement.className = styles["searchbar"];
    this.outputElement.innerHTML = `
   <div class=${styles["header"]}>OpenWeather Search</div>
   <div>
   <form>
   <input id="location_name" type="text" width=25 />
   <button id="search">Search</button>
   <button id="metric">C</button>
   <button id="imperial">F</button>

   </form> 
    
    
    `;
  }
}

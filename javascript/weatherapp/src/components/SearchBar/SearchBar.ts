import * as app from "../../app/App";
import { Component } from "../Prototype/Component";

export class SearchBar extends Component {
  private pubsub: app.PubSub;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.pubsub = pubsub;
    this._bindHandler("click", this.handleSearch.bind(this));
  }

  private handleSearch(e: Event) {
    let targetElement = <HTMLElement>e.target;
    let locationName = <HTMLFormElement>(
      app.containerDiv.querySelector("#location_name")
    );
    if (targetElement.id == "search") {
      e.preventDefault();
      this.pubsub.publish(
        app.enumEventMessages.SEARCH_LOCATIONS,
        locationName.value
      );
    }
  }

  protected _updateOutputElement() {
    //this.outputElement.className = ;
    this.outputElement.innerHTML = `
   <form>
   <input id="location_name" type="text" width=25 />
   <button id="search">Search</button>

   </form> 
    
    
    `;
  }
}

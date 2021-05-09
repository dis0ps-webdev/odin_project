import * as app from "../App";

export class AppController {
  private pubsub: app.PubSub;
  private weather: app.WeatherService;

  constructor(pubsub: app.PubSub) {
    this.pubsub = pubsub;
    this.weather = new app.WeatherService();
    this.registerSubscriptions();
  }

  private registerSubscriptions() {
    this.pubsub.subscribe(
      app.enumEventMessages.SEARCH_LOCATIONS,
      this.handleSearchLocations.bind(this)
    );
    this.pubsub.subscribe(
      app.enumEventMessages.CHOOSE_LOCATION,
      this.handleChooseLocation.bind(this)
    );
  }

  private async handleSearchLocations(data: any) {
    let arrLocations = await this.weather.searchLocations(data);
    console.log(arrLocations);
    this.pubsub.publish(
      app.enumEventMessages.UPDATE_SEARCH_COMPONENTS,
      arrLocations
    );
  }

  private handleChooseLocation(data: any) {
    console.log(data);
  }
}

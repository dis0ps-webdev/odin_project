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
    this.pubsub.subscribe(
      app.enumEventMessages.TOGGLE_UNITS,
      this.handleChangeUnits.bind(this)
    );
  }

  private async handleSearchLocations(data: string) {
    let arrLocations = await this.weather.searchLocations(data);
    this.pubsub.publish(
      app.enumEventMessages.UPDATE_SEARCH_RESULTS,
      arrLocations
    );
  }

  private async handleChooseLocation(data: app.LocationData) {
    await this.weather.setLocation(data);
    this.pubsub.publish(
      app.enumEventMessages.UPDATE_CURRENT_WEATHER,
      this.weather.getCurrent()
    );
    this.pubsub.publish(
      app.enumEventMessages.UPDATE_FORECAST_WEATHER,
      this.weather.getForecast()
    );
  }

  private async handleChangeUnits(units: string) {
    const currentLocation = this.weather.getLocation();
    await this.weather.setLocation(currentLocation, units);
    this.pubsub.publish(
      app.enumEventMessages.UPDATE_CURRENT_WEATHER,
      this.weather.getCurrent()
    );
    this.pubsub.publish(
      app.enumEventMessages.UPDATE_FORECAST_WEATHER,
      this.weather.getForecast()
    );
  }
}

import * as app from "../../app/App";
import styles from "./CurrentWeather.local.scss";
import { Component } from "../Prototype/Component";

export class CurrentWeather extends Component {
  private pubsub: app.PubSub;
  private weatherForecast: app.DailyForecastData;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.pubsub = pubsub;
    this.pubsub.subscribe(
      app.enumEventMessages.UPDATE_CURRENT_WEATHER,
      this.handleCurrentWeather.bind(this)
    );
    this.pubsub.subscribe(
      app.enumEventMessages.UPDATE_SEARCH_RESULTS,
      this.makeInvisibile.bind(this)
    );
  }

  private handleCurrentWeather(data: app.DailyForecastData) {
    this.weatherForecast = data;
    this.makeVisibile();
  }

  private makeVisibile() {
    this.render();
    this.outputElement.classList.add(styles["visible"]);
  }

  private makeInvisibile() {
    this.render();
    this.outputElement.classList.remove(styles["visible"]);
  }

  protected _updateOutputElement() {
    if (this.weatherForecast !== undefined) {
      const { icon, current_temp, description, location} =
        this.weatherForecast;
      let region = location.region != undefined ? location.region : "";
      this.outputElement.className = styles["currentweatherwrapper"];
      this.outputElement.innerHTML = `
        <div class=${styles["currentweather"]}>
        <h1>Current Conditions</h1>
        <h2>${location.city}, ${region} ${location.country}</h2>
        <img src=${icon} />
        <h3>${current_temp}&deg;</h3>
        <p>${description}</p>
        </div>
      `;
    }
  }
}

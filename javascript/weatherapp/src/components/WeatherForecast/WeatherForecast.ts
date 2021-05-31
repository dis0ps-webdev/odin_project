import * as app from "../../app/App";
import styles from "./WeatherForecast.local.scss";
import { Component } from "../Prototype/Component";

export class WeatherForecast extends Component {
  private pubsub: app.PubSub;
  private weatherForecast: Array<app.DailyForecastData>;

  constructor(container: Element, pubsub: app.PubSub) {
    super(container);
    this.pubsub = pubsub;
    this.pubsub.subscribe(
      app.enumEventMessages.UPDATE_FORECAST_WEATHER,
      this.handleCurrentWeather.bind(this)
    );
    this.pubsub.subscribe(
      app.enumEventMessages.UPDATE_SEARCH_RESULTS,
      this.makeInvisibile.bind(this)
    );
  }

  private handleCurrentWeather(data: Array<app.DailyForecastData>) {
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
      this.outputElement.className = styles["forecastwrapper"];

      this.outputElement.innerHTML = "";
      this.weatherForecast.forEach((forecastDay) => {
        const { date, day, icon, day_temp, night_temp, description } =
          forecastDay;
        this.outputElement.innerHTML += `
        <div class=${styles["weatherforecast"]}>
        <h1>${day}, ${date}</h1> 
        <img src=${icon} />
        <h2>Day: ${day_temp}&deg;</h2>
        <h2>Night: ${night_temp}&deg;</h2>
        <p>${description}</p>
        </div>
      `;
      });
    }
  }
}

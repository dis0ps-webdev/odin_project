import * as layout from "../css/layout.global.scss";
import * as typography from "../css/typography.global.scss";
import * as app from "../app/App";
import * as components from "../components/Components";

const global_layout = layout;
const global_typography = typography;

const pubsub = new app.PubSub();
const controller = new app.AppController(pubsub);
const searchbar = new components.SearchBar(app.containerDiv, pubsub);
const searchresults = new components.SearchResults(app.containerDiv, pubsub);
const current = new components.CurrentWeather(app.containerDiv, pubsub);
const forecast = new components.WeatherForecast(app.containerDiv, pubsub);

searchbar.render();
searchresults.render();
current.render();
forecast.render();

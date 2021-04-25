import * as layout from "../css/layout.global.scss";
import * as typography from "../css/typography.global.scss";
import * as app from "../app/App";
import { WeatherService } from "../app/App";

const global_layout = layout;
const global_typography = typography;

app.containerDiv.innerHTML = "<div>Hello World!</div>";
const weather = new app.WeatherService();
weatherProcess().then((data) => console.log(data));

//IIFE, maybe cleaner with a than()
/*
(async () => {
  let testData = await weather.getLocation("springfield");
  console.log(testData);
})();
*/
async function weatherProcess() {
  let location = await weather.getLocation("Springfield");
  console.log(location)
  weather.setLocation(location[1]);
  let weatherData = weather.getWeather();
  return weatherData;

}

export const containerDiv = <Element>document.querySelector("#container");
export const apiKey = "92579840e70660f9254cb2c344d28448";
export const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall";
export const geocodeAPI = "https://api.openweathermap.org/geo/1.0/direct";

export const debug = false;

export const units = {
  METRIC: "metric",
  IMPERIAL: "imperial",
};

export enum enumEventMessages {
  "SEARCH_LOCATIONS",
  "CHOOSE_LOCATION",
  "UPDATE_SEARCH_RESULTS",
  "UPDATE_CURRENT_WEATHER",
  "UPDATE_FORECAST_WEATHER",
  "TOGGLE_UNITS",
}

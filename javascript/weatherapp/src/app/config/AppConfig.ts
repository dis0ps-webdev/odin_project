export const containerDiv = <Element>document.querySelector("#container");
export const apiKey = "92579840e70660f9254cb2c344d28448";
export const weatherAPI = "http://api.openweathermap.org/data/2.5/onecall";
export const geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct";

export const debug = true;

export enum enumEventMessages {
  "SEARCH_LOCATIONS",
  "CHOOSE_LOCATION",
  "UPDATE_SEARCH_COMPONENTS",
  "UPDATE_WEATHER_COMPONENTS",
}

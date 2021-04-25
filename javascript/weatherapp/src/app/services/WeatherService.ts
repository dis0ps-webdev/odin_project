import * as app from "../App";
import { LocationData } from "../models/LocationData";

export class WeatherService {
  private location: app.LocationData;
  private units: string = "imperial";

  constructor() {}

  private async callLocationAPI(location: string) {
    // https://openweathermap.org/api/geocoding-api

    const apiCall = `${app.geocodeAPI}?q=${location}&limit=5&appid=${app.apiKey}`;
    let apiResult = await fetch(apiCall);
    let jsonResult = await apiResult.json();

    return jsonResult;
  }

  private async callWeatherAPI() {
    // https://openweathermap.org/api/one-call-api

    let lat = this.location.lat;
    let lon = this.location.lon;

    const apiCall = `${app.weatherAPI}?units=${this.units}&exclude=minutely,hourly&lat=${lat}&lon=${lon}&appid=${app.apiKey}`;
    let apiResult = await fetch(apiCall);
    let jsonResult = await apiResult.json();

    return jsonResult;
  }

  public setLocation(location: app.LocationData) {
    this.location = location;
  }

  public async getLocation(location: string): Promise<any> {
    let locationInfo = await this.callLocationAPI(location);

    let arrayLocation = Array<app.LocationData>();
    if (locationInfo instanceof Array) {
      locationInfo.forEach((location) => {
        let objLocation = new app.LocationData();
        objLocation.lat = location.lat;
        objLocation.lon = location.lon;
        objLocation.city = location.name;
        objLocation.region = location.state;
        objLocation.country = location.country;
        arrayLocation.push(objLocation);
      });
    } else {
      arrayLocation.push(locationInfo);
    }

    return arrayLocation;
  }

  public async getWeather(): Promise<any> {
    let weatherInfo = await this.callWeatherAPI();
    return weatherInfo;
  }
}

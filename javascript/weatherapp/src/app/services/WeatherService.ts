import * as app from "../App";
import { DailyForecastData } from "../models/DailyForecastData";

export class WeatherService {
  private location: app.LocationData;
  private currentWeather: app.DailyForecastData;
  private weatherForecast: Array<app.DailyForecastData> = new Array<app.DailyForecastData>();
  private units: string = "imperial";
  private timezone: string;
  private timezone_offset: number;

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

  private async updateWeather(): Promise<any> {
    let weatherInfo = await this.callWeatherAPI();

    this.timezone = weatherInfo.timezone;
    this.timezone_offset = weatherInfo.timezone_offset;

    this.currentWeather = this.mapWeatherObject(weatherInfo.current);

    weatherInfo.daily.forEach((dataElement: any) => {
      let forecastData = this.mapWeatherObject(dataElement);
      this.weatherForecast.push(forecastData);
    });
  }

  public async setLocation(location: app.LocationData) {
    this.location = location;
    await this.updateWeather();
  }

  public async searchLocations(location: string): Promise<any> {
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

  private convertDateDay(epochTime: number) {
    let dateTime = epochTime * 1000;
    let dateObject = new Date(dateTime);
    return dateObject.toLocaleString("en-US", {
      weekday: "long",
      month: "long",
      day: "2-digit",
    });
  }

  private mapWeatherObject(dataElement: any) {
    let forecastData = new DailyForecastData();
    let dateString = this.convertDateDay(dataElement.dt);
    forecastData.date = dateString.split(",")[1];
    forecastData.day = dateString.split(",")[0];

    if (typeof dataElement.temp == "number") {
      forecastData.current_temp = dataElement.temp;
    } else {
      forecastData.day_temp = dataElement.temp.day;
      forecastData.night_temp = dataElement.temp.night;
    }

    forecastData.humidity = dataElement.humidity;
    forecastData.dew_point = dataElement.dew_point;
    forecastData.description = dataElement.weather[0].description;
    forecastData.icon = `http://openweathermap.org/img/wn/${dataElement.weather[0].icon}@2x.png`;
    return forecastData;
  }

  public getForecast() {
    return this.weatherForecast;
  }

  public getCurrent() {
    return this.currentWeather;
  }
  
  public getLocation() {
    return this.location;
  }
}

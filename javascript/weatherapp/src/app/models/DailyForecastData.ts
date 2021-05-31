import { AppController } from "../controller/AppController";
import {LocationData} from "./LocationData";

interface ForecastObject {
  date: string;
  day: string;
  current_temp: number;
  day_temp: number;
  night_temp: number;
  humidity: number;
  dew_point: number;
  description: string;
  icon: string;
}

export class DailyForecastData implements ForecastObject {
  public date: string;
  public day: string;
  public day_temp: number;
  public current_temp: number;
  public night_temp: number;
  public humidity: number;
  public dew_point: number;
  public description: string;
  public icon: string;
  public location: LocationData;
}

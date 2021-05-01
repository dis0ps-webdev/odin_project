interface ForecastObject {
  date: string;
  day: string;
  day_temp: number;
  night_temp: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export class DailyForecastData implements ForecastObject {
  public date: string;
  public day: string;
  public day_temp: number;
  public night_temp: number;
  public humidity: number;
  public dew_point: number;
  public wind_speed: number;
  public description: string;
  public icon: string;
}

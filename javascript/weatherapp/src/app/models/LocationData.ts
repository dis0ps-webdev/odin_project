interface LocationObject {
  lat: number;
  lon: number;
  city: string;
  region: string;
  country: string;
}

export class LocationData implements LocationObject {
  public lat: number;
  public lon: number;
  public city: string;
  public region: string;
  public country: string; 
}

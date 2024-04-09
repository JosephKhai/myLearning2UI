import { Observable } from "rxjs";
import { Country } from "./Country";

export interface City {
    Id: number;
    Name: string;
    Lat: number;
    Lon: number;
    CountryId: number;
    Country: Country
    
}

export abstract class CityData {
    abstract getAll(): Observable<City[]>;
    abstract get(code: number): Observable<City>;
    abstract update(city: City): Observable<City>;
    abstract create(city: City): Observable<City>;
    abstract delete(code: string): Observable<boolean>;
}


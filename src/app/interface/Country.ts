import { Observable } from "rxjs";
import { City } from "./City";


export interface Country {
    id: number;
    name: string;
    iso2: string;
    iso3: string;
    city: City[];
}

export abstract class CountryData {
    abstract list(pageNumber: number, pageSize: number): Observable<Country[]>;
    abstract get(code: number): Observable<Country>;
    abstract update(country: Country): Observable<Country>;
    abstract create(country: Country): Observable<Country>; 
    abstract delete(code: number): Observable<any>;
}
import { Observable } from "rxjs";
import { City } from "./City";


export interface Country {
    Id: number;
    Name: string;
    ISO2: string;
    ISO3: string;
    City: City[];
}

export abstract class CountryData {
    abstract list(pageNumber: number, pageSize: number): Observable<Country[]>;
    abstract get(code: number): Observable<Country>;
    abstract update(country: Country): Observable<Country>;
    abstract create(country: Country): Observable<Country>; 
    abstract delete(code: number): Observable<any>;
}
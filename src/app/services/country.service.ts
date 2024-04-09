import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Country } from '../interface/Country';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }


  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.baseUrl + 'api/country');
  }


}

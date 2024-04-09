import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { City } from '../interface/City';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(environment.baseUrl + 'api/city');
  }

  
}



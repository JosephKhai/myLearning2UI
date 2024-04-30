import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { City } from '../interface/City';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class CityService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  getCities(): Observable<City> {
    return this.http.get<City>(environment.baseUrl + 'api/city');
  }

  getData(event: PageEvent): Observable<any> {
    var url = environment.baseUrl + 'api/city/GetAllCitiesPagination';
    var params = new HttpParams()
    .set("pageIndex", event.pageIndex)
    .set("pageSize", event.pageSize);

    return this.http.get<any>(url, {params});
      
  }

  
}



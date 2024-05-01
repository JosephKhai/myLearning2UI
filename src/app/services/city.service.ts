import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { City } from '../interface/City';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

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

  getData(
    event: PageEvent, 
    sort: Sort, 
    defaultSortColumn: string, 
    defaultSortOrder: string,
    filterColumn: string,
    filterQuery: string
  ): Observable<any> {
    var url = environment.baseUrl + 'api/city/GetAllCitiesPagination';
    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", (sort) ? sort.active : defaultSortColumn)
      .set("sortOrder", (sort) ? sort.direction : defaultSortOrder);

      if(filterQuery) {
        params = params.set("filterColumn", filterColumn);
        params = params.set("filterQuery", filterQuery);
      }

    return this.http.get<any>(url, { params });

  }


}



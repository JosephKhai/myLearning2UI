import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Country } from '../interface/Country';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';

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

  getData(
    event: PageEvent,
    sort: Sort,
    defaultSortColumn: string,
    defaultSortOrder: string,
    filterColumn: string,
    filterQuery: string
  ): Observable<any> {

    var url = environment.baseUrl + 'api/Country/GetAllCountriesPagination';

    var params = new HttpParams()
      .set("pageIndex", event.pageIndex.toString())
      .set("pageSize", event.pageSize.toString())
      .set("sortColumn", (sort) ? sort.active : defaultSortColumn)
      .set("sortOrder", (sort) ? sort.direction : defaultSortOrder);

    if (filterQuery) {
      params = params.set("filterColumn", filterColumn);
      params = params.set("filterQuery", filterQuery);
    }

    return this.http.get<any>(url, { params });
  }




}

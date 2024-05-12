import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Country } from '../interface/Country';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CountryService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }


  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(environment.baseUrl + 'api/country/getall');
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


  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(environment.baseUrl + 'api/country/' + id);
  }

  update(country: Country): Observable<Country> {
    return this.http.put<Country>(environment.baseUrl + 'api/country/update/' + country.id, country);
  }

  create(country: Country): Observable<Country> {
    return this.http.post<Country>(environment.baseUrl + 'api/country/create', country);
  }

  isDuplicateField(countryId: string, fieldName: string, fieldValue: string): Observable<any> {
    var params = new HttpParams()
        .set("countryId", countryId.toString())
        .set("fieldName", fieldName)
        .set("fieldValue", fieldValue);
    
    return this.http.post<boolean>(environment.baseUrl + 'api/country/IsDuplicateField', null, {params});
  }




}

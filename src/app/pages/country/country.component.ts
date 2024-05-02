import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/interface/Country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit, OnDestroy {

  public countries!: MatTableDataSource<Country>;
  displayedColumns: string[] = ['id', 'name', 'isO2', 'isO3'];
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "name";
  filterQuery!: string;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  constructor(private countryService: CountryService) { }

  subscrition!: Subscription;

  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.loadData('');
  }

  loadData(query: string){
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);
  }

  getData(event: PageEvent): void {
    this.countryService.getData(
      event || this.paginator.page, 
      this.sort, 
      this.defaultSortColumn, 
      this.defaultSortOrder,
      this.defaultFilterColumn,
      this.filterQuery
    ).subscribe(result => {
      
      console.log(result);
      this.paginator.length = result.totalCount;
      this.paginator.pageIndex = result.pageIndex;
      this.paginator.pageSize = result.pageSize;

      this.countries = new MatTableDataSource<Country>(result.data);
      this.countries.sort = this.sort;
      this.countries.filter = this.filterQuery;
    }, error => console.log(error));
  }

}

import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { City } from 'src/app/interface/City';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit, OnDestroy {

  cities!: MatTableDataSource<City>;
  displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];
  defaultPageIndex: number = 0;
  defaultPageSize: number = 10;
  public defaultSortColumn: string = "name";
  public defaultSortOrder: "asc" | "desc" = "asc";
  defaultFilterColumn: string = "name";
  filterQuery!: string;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cityService: CityService) { }

  subscribtion!: Subscription;

  ngOnDestroy(): void {

  }


  ngOnInit(): void {

    this.loadData('');

  }

  loadData(query: string) {

    var pageEvent = new PageEvent();
    pageEvent.pageIndex = this.defaultPageIndex;
    pageEvent.pageSize = this.defaultPageSize;
    this.filterQuery = query;
    this.getData(pageEvent);

  }

  /**
   * Fetches data from the server based on the given page event.
   *
   * @param event - The page event that contains information about the page and the page size.
   */
  getData(event: PageEvent): void {

    this.cityService.getData(
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

      this.cities = new MatTableDataSource<City>(result.data);
      this.cities.sort = this.sort;
      this.cities.filter = this.filterQuery;
    }, error => console.log(error));
  }

}

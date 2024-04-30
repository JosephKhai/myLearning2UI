import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cityService: CityService) { }

  subscribtion!: Subscription;

  ngOnDestroy(): void {

  }



  ngOnInit(): void {
    // this.cityService.getCities().subscribe(data => {
    //   this.cities = new MatTableDataSource<City>(data);
    //   this.cities.paginator = this.paginator;
    // }, error => console.log(error));

    
    var pageEvent = new PageEvent();
    pageEvent.pageIndex = 0;
    pageEvent.pageSize = 10;
    this.getData(pageEvent);

  
  }

/**
 * Fetches data from the server based on the given page event.
 *
 * @param event - The page event that contains information about the page and the page size.
 */
getData(event: PageEvent): void {

  this.cityService.getData(event).subscribe(result => {

    console.log(result);
    this.paginator.length = result.totalCount;
    this.paginator.pageIndex = result.pageIndex;
    this.paginator.pageSize = result.pageSize;

    this.cities = new MatTableDataSource<City>(result.data);
  }, error => console.log(error));
}

  

}

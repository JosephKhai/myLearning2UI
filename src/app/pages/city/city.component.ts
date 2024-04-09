import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { error } from 'console';
import { City } from 'src/app/interface/City';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {

  cities!: MatTableDataSource<City>;
  displayedColumns: string[] = ['id', 'name', 'lat', 'lon'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cityService: CityService) { }



  ngOnInit() {

    this.cityService.getCities().subscribe(data => {
      this.cities = new MatTableDataSource<City>(data);
      this.cities.paginator = this.paginator;
    }, error => console.log(error));

  }

}

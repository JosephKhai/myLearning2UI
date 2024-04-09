import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Country } from 'src/app/interface/Country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  public countries!: MatTableDataSource<Country>;
  displayedColumns: string[] = ['id', 'name', 'isO2', 'isO3']; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  
  constructor(private countrySerVice: CountryService) { }

  ngOnInit(): void {
    this.countrySerVice.getCountry().subscribe(countries => {
      this.countries = new MatTableDataSource<Country>(countries);
      this.countries.paginator = this.paginator;
    });
  }

}

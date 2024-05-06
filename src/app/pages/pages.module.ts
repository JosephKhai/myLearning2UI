import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { CityEditComponent } from './city/city.edit/city.edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    CityComponent,
    CountryComponent,
    CityEditComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule
  

  ],
  exports: [
    CityComponent,
    CountryComponent
  ]
})
export class PagesModule { }

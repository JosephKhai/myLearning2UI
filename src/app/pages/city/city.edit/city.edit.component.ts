import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { Observable, map } from 'rxjs';
import { City } from 'src/app/interface/City';
import { Country } from 'src/app/interface/Country';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-city.edit',
  templateUrl: './city.edit.component.html',
  styleUrls: ['./city.edit.component.scss']
})
export class CityEditComponent implements OnInit {

  title?: string;
  form!: FormGroup;
  city?: City;
  id?: number;
  countries?: Country[];


  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private cityService: CityService,
    private countryService: CountryService


  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      lat: new FormControl('', Validators.required),
      lon: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
    }, null, this.isDuplicateCity());

    this.loadData();
  }


  isDuplicateCity(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {

      var city = <City>{};
      city.id = (this.id) ? this.id : 0;
      city.name = this.form.controls['name'].value;
      city.lat = this.form.controls['lat'].value;
      city.lon = this.form.controls['lon'].value;
      city.countryId = this.form.controls['countryId'].value;

      return this.cityService.isDuplicateCity(city).pipe(map(result => {
        return (result ? { isDuplicateCity: true } : null);
      }));

    }
  }


  loadData() {

    //load countries
    this.loadCountries();

    var idParam = this.activateRoute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;

    if (this.id) {
      // EDIT MODE

      this.cityService.getById(Number(this.id)).subscribe(
        (data) => {
          this.city = data;
          this.title = "Edit " + this.city.name;

          this.form.patchValue(this.city);

        }, error => {
          console.log(error);
        }
      );

    }
    else {
      // ADD NEW MODE
      this.title = "Add New City";
    }

  }

  loadCountries() {
    //fetch all the countries from the server

    this.countryService.getCountries().subscribe(
      (data) => {
        this.countries = data;
      }, error => {
        console.log(error);
      }
    );

  }


  onSubmit() {
    var city = (this.id) ? this.city : <City>{};
    if (city) {
      city.name = this.form.value.name;
      city.lat = this.form.value.lat;
      city.lon = this.form.value.lon;
      city.countryId = +this.form.value.countryId;

      if (this.id) {
        //EDIT MODE
        this.cityService.update(city).subscribe(
          (data) => {
            console.log("City " + city?.id + " has been updated. ");

            this.router.navigate(['/cities']);
          }, error => {
            console.log(error);
          }
        );

      } else {
        //ADD NEW MODE
        this.cityService.create(city).subscribe(
          (data) => {

            console.log("City " + data?.id + " has been created. ");

            this.router.navigate(['/cities']);

          }, error => {
            console.log(error);
          }

        )
      }

    }

  }

}


import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Country } from 'src/app/interface/Country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country.edit',
  templateUrl: './country.edit.component.html',
  styleUrls: ['./country.edit.component.scss']
})
export class CountryEditComponent implements OnInit {

  title?: string;
  form!: FormGroup;
  country?: Country;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private countryService: CountryService

  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['',
        [Validators.required,
        this.isDuplicateField("name")
      ]],
      iso2: ['',
        [Validators.required,
        Validators.pattern(/^[a-zA-Z]{2}$/),
        this.isDuplicateField("iso2")
      ]],
      iso3: ['',
        [Validators.required,
        Validators.pattern(/^[a-zA-Z]{3}$/),
        this.isDuplicateField("iso3")
      ]],
    });

    this.loadData();
  }


  loadData() {

    var idParam = this.activatedRoute.snapshot.paramMap.get('id');

    this.id = idParam ? +idParam : 0;

    if (this.id) {
      // EDIT MODE
      this.countryService.getCountryById(this.id).subscribe(result => {
        this.country = result;

        this.title = "Edit " + this.country.iso3;

        this.form.patchValue(this.country);

      }, error => console.log(error));

    } else {
      // ADD NEW MODE
      this.title = "Add New Country";

    }
  }

  onSubmit() {
    var country = (this.id) ? this.country : <Country>{};

    if (country) {
      country.name = this.form.value.name;
      country.iso2 = this.form.value.iso2;
      country.iso3 = this.form.value.iso3;

      if (this.id) {
        //EDIT MODE
        this.countryService.update(country).subscribe(
          (data) => {
            console.log("Country " + country!.id + " has been updated");

            this.router.navigate(['/countries']);
          }, error => {
            console.log(error);
          }
        );
      }
      else {
        //ADD NEW MODE
        if (this.form.valid) {

          this.countryService.create(country).subscribe(
            (data) => {
              console.log("Country " + country!.id + " has been created");

              this.router.navigate(['/countries']);
            }, error => {
              console.log(error);
            }
          );

        }

      }
    }

  }



  isDuplicateField(fieldName: string): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{
      [key: string]: any
    } | null> => {

      let countryId = this.id ? this.id.toString() : "0";

      return this.countryService.isDuplicateField(countryId, fieldName, control.value).pipe(map(result => {
        return (result ? { isDuplicateField: true } : null);
      }));
    }
  }

}

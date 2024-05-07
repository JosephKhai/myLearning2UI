import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  countries?: Country[];
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
        Validators.required,
        this.isDuplicateField("name")],
      iso2: ['',
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{2}$/),
        this.isDuplicateField("iso2")
      ],
      iso3: ['',
        Validators.required,
        Validators.pattern(/^[a-zA-Z]{3}$/),
        this.isDuplicateField("iso3")
      ]
    });

    this.loadData();
  }


  loadData() {

    var idParam = this.activatedRoute.snapshot.paramMap.get('id');

    this.id = idParam ? +idParam : 0;

    if(this.id){
      // EDIT MODE

     


     
    }else{
      // ADD NEW MODE
      this.title = "Add New Country";


    }


  }


  isDuplicateField(name: string): boolean {

    return true;

  }

}

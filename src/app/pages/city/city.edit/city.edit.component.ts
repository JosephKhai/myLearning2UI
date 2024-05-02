import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/interface/City';
import { CityService } from 'src/app/services/city.service';

@Component({
  selector: 'app-city.edit',
  templateUrl: './city.edit.component.html',
  styleUrls: ['./city.edit.component.scss']
})
export class CityEditComponent implements OnInit {

  title?: string;
  form!: FormGroup;
  city?: City;


  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private cityService: CityService,


  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl('name', Validators.required),
      lat: new FormControl('lat', Validators.required),
      lon: new FormControl('lon', Validators.required)
    });

    this.loadData();
  }


  loadData(){

    var idParam = this.activateRoute.snapshot.paramMap.get('id');
    var id = idParam ? idParam : 0;

  //   this.cityService.getData(id).subscribe(
  //     (data) => {

   }

}

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CityComponent } from "./pages/city/city.component";
import { CountryComponent } from "./pages/country/country.component";
import { CityEditComponent } from "./pages/city/city.edit/city.edit.component";
import { CountryEditComponent } from "./pages/country/country.edit/country.edit.component";

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'cities', component: CityComponent },
    { path: 'city/:id', component: CityEditComponent },
    { path: "city", component: CityEditComponent },
    { path: 'countries', component: CountryComponent },
    { path: "country/:id", component: CountryEditComponent },
    { path: "country", component: CountryEditComponent },



]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule { }
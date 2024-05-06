import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CityComponent } from "./pages/city/city.component";
import { CountryComponent } from "./pages/country/country.component";
import { CityEditComponent } from "./pages/city/city.edit/city.edit.component";

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'cities', component: CityComponent },
    { path: 'city/:id', component: CityEditComponent },
    { path: "city", component: CityEditComponent },
    { path: 'country', component: CountryComponent }


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
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CityComponent } from "./pages/city/city.component";
import { CountryComponent } from "./pages/country/country.component";

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full'},
    { path: 'city', component: CityComponent},
    { path: 'country', component: CountryComponent}


]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule{}
import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

const dashboardRoutes : Route[] = [
    {
        path : '',
        component : HomeComponent
    }
]


@NgModule({
    imports : [RouterModule.forChild(dashboardRoutes)]
})
export class DashboardRoutingModule {

}
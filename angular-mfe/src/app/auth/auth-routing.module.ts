import { NgModule } from "@angular/core";
import { RouterModule, Routes, Route } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { LayoutComponent } from "./layouts/layout/layout.component";

export const authRoutes : Route[] = [
    {
        path : '',
        component : LayoutComponent,
        children : [
            {
                path : 'login',
                component : LoginComponent,
            },
            {
                path : '**',
                redirectTo : 'login',
                pathMatch : 'full'
            },
            {
                path : '',
                redirectTo : 'login',
                pathMatch : 'full'
            }
        ]
    }
]

@NgModule({
    imports : [RouterModule.forChild(authRoutes)],
    exports : [RouterModule]
})
export class AuthRoutingModule {}

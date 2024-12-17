import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AngularComponent } from './angular/angular.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'angular1', component: AngularComponent},
  // {
  //   path : 'auth',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path : '',
  //   redirectTo : 'auth',
  //   pathMatch : 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

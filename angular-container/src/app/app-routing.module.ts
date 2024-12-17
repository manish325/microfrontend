import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  startsWith,
  WebComponentWrapper, WebComponentWrapperOptions
} from '@angular-architects/module-federation-tools';
import * as path from 'path';
import { AuthGuard } from './guards/auth.guard';
import { RouteGuard } from './guards/route.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './auth-module'
      })
        .then((m: any) => {
          console.log("Auth Module Loaded : ", m);
          return m.AuthModule;
        }),
    canActivate: [RouteGuard]
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './web-components',
      elementName: 'react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'react1',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      remoteName: 'react',
      exposedModule: './react-component-1',
      elementName: 'react-component-1',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'dashboard',
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }



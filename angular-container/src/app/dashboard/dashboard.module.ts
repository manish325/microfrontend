import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DynamicComponentComponent } from '../dynamic-component/dynamic-component.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { createCustomElement } from '@angular/elements';
import { AddTaskComponent } from '../wrappers/react/add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    TaskDetailsComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DynamicComponentComponent,
    MatDialogModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {
  constructor(private injector : Injector) {
  }
 }

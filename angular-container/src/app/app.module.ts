import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService } from './store.service';
import { HeaderComponent } from './header/header.component';
import {createCustomElement} from "@angular/elements";
import { CustomElementService } from 'src/services/customElement.service';
import { TaskDetailsComponent } from './dashboard/pages/task-details/task-details.component';
import { AddTaskComponent } from './wrappers/react/add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadRemoteModule } from '@angular-architects/module-federation';


export function initializeStore(storeService: StoreService) {
  return () => storeService.getStore(); // Return a promise to wait for
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // AddTaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    // MatDialogModule,
    BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    StoreService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeStore,
      deps: [StoreService],
      multi: true,
    },
    CustomElementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const headerComponent = createCustomElement(HeaderComponent, {injector: this.injector});
    customElements.define('app-header', headerComponent);
    const taskDetailsComponent = createCustomElement(TaskDetailsComponent, { injector: this.injector });
    customElements.define('app-task-details', taskDetailsComponent);
  }

  async ngDoBootstrap(appRef: ApplicationRef): Promise<void> {
    const { defineAllElements } = await loadRemoteModule({
      remoteEntry: "http://localhost:4204/remoteEntry.js",
      exposedModule: "./define-custom-elements",
      type: 'script',
      remoteName: "react"
    })
    console.log("logging the define elements funciton as ")
    console.log(defineAllElements);
    console.log("Bhosadicha call jhala!!");
    defineAllElements();
  }
 }
 
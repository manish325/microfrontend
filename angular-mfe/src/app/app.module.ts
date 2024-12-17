import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AngularComponent } from './angular/angular.component';
import { HeaderComponent } from './header/header.component';
import {createCustomElement} from "@angular/elements"
import { StoreService } from './store/store.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AngularComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [StoreService],
  bootstrap: []
})
export class AppModule {
  constructor(private injector : Injector) {
    const headerComponent = createCustomElement(HeaderComponent, {injector});
    customElements.define('angular-header', headerComponent);
  }
 }

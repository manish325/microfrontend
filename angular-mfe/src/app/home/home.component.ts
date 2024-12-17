import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { StoreService } from '../store/store.service';
declare const require: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  angularVersion = require('./../../../package.json').dependencies['@angular/core'];
  inputValue : any;
  appState  : any;

  constructor(
    private storeService : StoreService
  ) { }

  ngOnInit(): void {
   this.setupStore();
   console.log("Logging from om init the appState : ", this.appState);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Logging the changes!")
      console.log(changes);
  }

  async setupStore () {
    await this.storeService.getStore();
    this.appState = this.storeService.getCurrentState();
    this.storeService.getStoreInstance().subscribe(() => {
      console.log("State Update from angular MFE");
      this.appState = this.storeService.getCurrentState();
      console.log(this.appState);
    });
  }

  setState() {
    this.storeService.setUserState(this.inputValue);
  }

  getStateVal() {
    console.log(this.appState)
    return this.appState?.user?.user || 'Nothing In There Yet!!'
  }

}

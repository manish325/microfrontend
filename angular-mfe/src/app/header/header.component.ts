import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from '../store/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() username : string = '';
  constructor(
    private storeService : StoreService
  ) { }

  ngOnInit(): void {
    this.storeService.appState.subscribe({
      next : (value) => {
        console.log("Got the Value", value);
        // this.username = value?.mfe?.user?.name;
      }
    })
  }

}

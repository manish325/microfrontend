import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

  @Output() buttonClicked = new EventEmitter();
  @Input() headerContent : string = '';
  constructor() { }

  ngOnInit(): void {
  }

  buttonIsClicked() {
    this.buttonClicked.emit('The Header Button was clicked with data as -> data');
  }

  ngOnChanges() {
    // alert('Component has changed!!');
  }

}

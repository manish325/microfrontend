import { AfterContentChecked, AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteComponent } from 'src/utils/_helpers';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  standalone : true
})
export class DynamicComponentComponent implements OnInit, AfterViewInit, AfterContentChecked {
  @Input() tag : string = '';
  remoteComponent : any;
  loaded : boolean = false;
  @Input() scope : string = '';
  @Input() componentName : string = '';

  @ViewChild('placeholder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  constructor() { }

  ngAfterViewInit(): void {
      // this.loadComponent();
  }

  ngAfterContentChecked(): void {
    // this.loadComponent();
  }

  ngOnInit() {
    // this.loadComponent();
  }
  
  async loadComponent() {
    const component = await loadRemoteComponent(this.scope, this.tag);
    console.log("Logging the remote Component => ", component[this.componentName]);
    this.remoteComponent = component[this.componentName];
    this.viewContainer.createComponent(this.remoteComponent);
    this.loaded = true;    
  }

  async loadWithViewChild() {

  }

}

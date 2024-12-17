import { Component, Injector, OnInit, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreService } from './store.service';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { setComponent } from 'src/utils/_helpers';
import { Router } from '@angular/router';
import { IApplicationState } from 'src/utils/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ViewChild('react-component1') reactComponent !: ElementRef<any>;
  title = 'angular-container';
  worker !: SharedWorker;
  inputState = new FormControl('');
  initialState: IApplicationState = {
    mfe : {
      user : null
    }
  }

  propsMap = { prop1: 'Hello from Angular', prop2: 10 };
  eventsMap = {
    reactEvent: (detail: any) => {
      console.log('Received from React:', detail);
    },
  };

  @setComponent('react-component1', 
    { prop1: 'Hello from Angular', prop2: 10 }, 
    {
      reactEvent: (detail: any) => {
        console.log('Received from React:', detail);
      },
    }
  )
  reactComponentm!: HTMLElement;

  constructor(
    private storeservice: StoreService,
    private router : Router,
    private injector : Injector
  ) {
  }

  ngOnInit() {
    this.logRegisteredCustomElements();
    // this.defineAllElements();
    this.defineAllComponents();
    setTimeout(() => {
      this.setState();
    }, 2000);
  }

  updateState(newState: any) {
    this.inputState.setValue("");
    this.worker.port.postMessage({ type: 'setState', payload: { state: newState } });
  }

  async setState() {
    await this.storeservice.getStore()
    const store = this.storeservice.getStoreInstance();
    console.log(this.storeservice.store);;
    // const store  = appStore;
    this.initialState = store.getState();
    console.log("Logging the store from HOST : ", store);
    store.subscribe(
      () => {
        this.initialState = store.getState();
        console.log("Logging the initial state change from Container")
        console.log(this.initialState);
        const {mfe} = this.initialState;
        const {user} = mfe;
        if(user && user.id && user.email) {
          localStorage.setItem('token', user.email);
          this.router.navigate(['/dashboard']);
        }
      }
    )
  }

  logRegisteredCustomElements() {
    const expectedElements = ['react-component1', 'react-task-component'];
    expectedElements.forEach((element) => {
      const isDefined = customElements.get(element);
      console.log(isDefined);
      if (isDefined) {
        console.log(`Custom element '${element}' is defined.`);
      } else {
        console.log(`Custom element '${element}' is NOT defined.`);
      }
    });
  }

  async defineAllElements() {
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
    // this.logRegisteredCustomElements();
    // this.cd.detectChanges();
    // this.appRef.tick();
  }

  executer() {
    
    return () => {
      // alert('I have been executed!!');
    }
  }

  async defineAllComponents() {
    const {registerCustomElement} = await loadRemoteModule({
      remoteEntry : 'http://localhost:4201/remoteEntry.js',
      // remoteName : './angularMfe',
      exposedModule : './define-elements',
      type : 'module'
    });
    registerCustomElement(this.injector);
  }

}

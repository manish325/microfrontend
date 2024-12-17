import { Injectable } from "@angular/core";
import { loadRemoteModule } from '@angular-architects/module-federation';
import { loadRemoteContent } from "src/utils/_helpers";
import { IUser } from "src/utils copy/types";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    store: any;
    setUser: any;
    appState: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    constructor() {
        this.getStore();
        // alert("created store Service!");
    }

    async getStore() {
        try {
            // if (!this.store) {

                const { store } = await loadRemoteModule({
                    remoteEntry: 'http://localhost:4200/remoteEntry.js',
                    exposedModule: './store',
                    type: 'script',
                    remoteName: 'angularContainer'
                })
                const { setUser } = await loadRemoteModule({
                    remoteEntry: 'http://localhost:4200/remoteEntry.js',
                    exposedModule: './slice',
                    type: 'script',
                    remoteName: 'angularContainer'
                })
                // const {store} = await loadRemoteContent('store');
                console.log(store);
                this.store = store;
                console.log(store.getState())
                // alert(`Now the MFE Store Got Set Up : ${store.getState().mfe?.user?.name}`)
                this.setUser = setUser;
                this.appState.next(this.store.getState());
                console.log("App Current State from angular Header IS : ", this.appState)
                this.store.subscribe(() => {
                    this.appState.next(this.store.getState());
                })
            // }
        } catch (e) {
            console.log(e);
        }
    }

    setUserState(name: IUser) {
        this.store.dispatch(this.setUser(name));
    }

    getCurrentState() {
        return this.appState.value;
    }

    getStoreInstance() {
        return this.store;
    }
}
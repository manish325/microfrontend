import { loadRemoteModule } from "@angular-architects/module-federation";
import { Injectable } from "@angular/core";
import { IUser } from "src/utils/types";

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    store: any;
    setUser: any;

    constructor() {
        this.getStore();
    }

    async getStore() {
        // if (!this.store) {

            const { store } = await loadRemoteModule({
                remoteEntry: 'http://localhost:4200/remoteEntry.js',
                exposedModule: './store',
                type: 'script',
                remoteName: 'angularContainer'
            });
            const { setUser } = await loadRemoteModule({
                remoteEntry: 'http://localhost:4200/remoteEntry.js',
                exposedModule: './slice',
                type: 'script',
                remoteName: 'angularContainer'
            });
            this.store = store;
            this.store.subscribe(() => {
                // alert(`User Update From Container IS : ${this.store.getState().mfe.user.name}`);
            })
            // this.store.dispatch(setUser({ name: 'Container User' }))
            this.setUser = setUser;
            return this.store;
        // }
    }

    getStoreInstance() {
        return this.store;
    }

    getUser() {
        return this.store.getState().mfe.user;
    }

    setTheUser(user: IUser) {
        this.store.dispatch(this.setUser(user));
        // alert(`User Dispatched from set user state Is : ${user.name}`);
    }
}
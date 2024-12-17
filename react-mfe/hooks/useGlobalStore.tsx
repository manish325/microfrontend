import { ActionCreatorWithPayload, EnhancedStore } from "@reduxjs/toolkit"
import { useCallback, useEffect, useState } from "react";
import { importRemote } from "@module-federation/utilities";


export const useGlobalStore = () => {
    const [store, setStore] = useState<EnhancedStore | null>(null);
    const [actions, setActions] = useState<{[key: string] : ActionCreatorWithPayload<any>} | null>(null);

    const getStoreDetails = useCallback(async () => {
        const {store} = await importRemote({
            module : './store',
            url: 'http://localhost:4200/remoteEntry.js',
            scope: 'angularContainer'
          }) as {store: EnhancedStore<any, any>};
          const {setUser, clearUser} = await importRemote({
            module : './slice',
            url: 'http://localhost:4200/remoteEntry.js',
            scope: 'angularContainer'
          }) as {setUser: ActionCreatorWithPayload<any, any>, clearUser: ActionCreatorWithPayload<any, any>};
        //   alert('React MFE Store!');
          setStore(store);
          setActions({setUser, clearUser});
          console.log('store from react is :', store);
    }, [
        setStore,
        setActions
    ]);

    useEffect(() => {
        getStoreDetails();
    }, []);

    return {store, actions, getStoreDetails}
}
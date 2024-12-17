import { Component, Injector, Type } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { exposableComponents } from "./data";

export const loadRemoteContent = async (module : string = 'store') => {
    try {
        const remoteContent = await import(`angularContainer/${module}`);
        return remoteContent;
    } catch(e) {
        console.log('Error while getting remote content as  : ', e);
        throw e;
    }
}




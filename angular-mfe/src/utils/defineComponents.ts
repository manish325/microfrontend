import { Injector } from "@angular/core";
import { createCustomElement } from "@angular/elements";
import { exposableComponents } from "./data";

export const registerCustomElement = ( injector : Injector) => {
    exposableComponents.forEach(async (ec) => {
        if(!customElements.get(ec.tag)) {
            const component = await ec.component();
            const customElement = createCustomElement(component, { injector });
            customElements.define(ec.tag, customElement);
        }
    });
}
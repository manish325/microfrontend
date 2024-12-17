import { ElementRef } from '@angular/core';

// Custom Decorator
export function setComponent(id: string, propsMap: Record<string, any>, eventsMap: Record<string, (detail: any) => void>) {
    return function(target: any, propertyKey: string) {
      let elementRef: HTMLElement | null | any = null;
  
      const getter = function() {
        return elementRef;
      };
  
      const setter = function(ref: HTMLElement | null) {
        // Find the element by ID
        elementRef = document.getElementById(id) as any;
  
        if (!elementRef) return;
  
        // Attaching props
        Object.keys(propsMap).forEach((key) => {
          elementRef[key] = propsMap[key];
        });
  
        // Attaching events
        Object.keys(eventsMap).forEach((event) => {
          elementRef?.addEventListener(event, (e: CustomEvent) => {
            eventsMap[event](e.detail);
          });
        });
      };
  
      Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
      });
    };
  }
  
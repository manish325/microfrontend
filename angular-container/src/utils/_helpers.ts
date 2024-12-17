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

  // remote-components-registry.ts
import { loadRemoteModule } from '@angular-architects/module-federation';

export const remoteComponentsRegistry = [
  {
    path: 'angularMfe/header',
    component: () =>
      loadRemoteModule({
        remoteEntry: 'http://localhost:<mfe-port>/remoteEntry.js',
        exposedModule: './header',
        remoteName : ''
      }).then((m) => m.HeaderComponent),
  },
  // {
  //   path: 'reactMfe/taskList',
  //   component: () =>
  //     loadRemoteModule({
  //       remoteEntry: 'http://localhost:<mfe-port>/remoteEntry.js',
  //       exposedModule: './taskList',
  //     }).then((m) => m.TaskListComponent),
  // },
  // Add other remote components here
];


export async function loadRemoteComponent(remoteName: string, exposedModule: string) {
  const module = await loadRemoteModule({
    remoteEntry: 'http://localhost:4201/remoteEntry.js',
    // remoteName: remoteName,
    exposedModule: exposedModule,
    type : 'module'
  });

  return module;
}


export const defineAllElements  = async () => {
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
}
  
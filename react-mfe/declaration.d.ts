declare module "mfe1/header" {
    const headerComponent : any;
    export default headerComponent;
}

declare module "angularContainer" {
    export const store : unknown;
}

declare module "angularContainer/slice" {
    export const setUser : unknown;
    export default setUser;
}

// custom.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'app-header': any;
      'react-component2' : any // Here 'app-header' is the custom element from Angular
      'react-component1' : any
      "app-task-details"  :any
       // Here 'app-header' is the custom element from Angular
    }
  }
  
  interface HTMLElementTagNameMap {
    'app-header': HTMLElement;
    'app-task-details' : HTMLElement;
     // Define the custom element in the global HTML element map
  }
  
  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }
  
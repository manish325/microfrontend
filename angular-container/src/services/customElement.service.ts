import { Injectable, ElementRef, Renderer2 } from '@angular/core';

interface IAttachPropsAndEvents {
  props: Record<string, any>;
  events: Record<string, (detail: any) => void>;
}

@Injectable({
  providedIn: 'root',
})
export class CustomElementService {
//   constructor(private renderer: Renderer2) {}

  initializeCustomElement(elementRef: ElementRef, { props, events }: IAttachPropsAndEvents, renderer: Renderer2) {
    const customElement = elementRef.nativeElement;
    console.log(customElement);
    // alert('')

    // Set properties
    Object.keys(props).forEach((key) => {
      renderer.setProperty(customElement, key, props[key]);
    });

    // Attach events
    Object.keys(events).forEach((event) => {
      customElement.addEventListener(event, (e: CustomEvent) => {
        // Call the event handler with the event detail
        events[event](e.detail);
      });
    });
  }

  sendMessageToReact(elementRef: ElementRef, eventName: string, message: any) {
    const customElement = elementRef.nativeElement;
    const event = new CustomEvent(eventName, {
      detail: message,
    });

    customElement.dispatchEvent(event);
  }

  cleanUpCustomElement(elementRef: ElementRef, events: string[]) {
    const customElement = elementRef.nativeElement;

    // Clean up event listeners
    events.forEach((event) => {
      customElement.removeEventListener(event, this.handleReactEvent);
    });
  }

  private handleReactEvent(event: CustomEvent) {
    console.log('Received from React:', event.detail);
    // Handle event here
  }
}

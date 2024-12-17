import reactToWebComponent from 'react-to-webcomponent';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import React, { Suspense, FC } from "react";
import { IAttachPropsAndEvents } from './types';
import { FormikProvider, useFormik } from 'formik';

// import { StylesProvider, createGenerateClassName } from '@mui/styles';
export const loadAngularComponent = async (component: string) => {
  return await import(`mfe1/${component}`);
}

type Scope = unknown;
type Factory = () => any;
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };


const loadRemoteModule = async (remoteUrl: string, scope: string, module: string) => {
  // Initialize the shared scope. This fills it with known provided modules from this build and all remotes.
  await __webpack_init_sharing__('default');

  // Fetch the remote entry file and initialize the remote container
  const container = (window as any)[scope];
  if (!container) {
    // Load the remote entry.js
    await new Promise<void>((resolve, reject) => {
      const element = document.createElement('script');
      element.src = remoteUrl;
      element.type = 'text/javascript';
      element.async = true;
      element.onload = () => {
        resolve();
      };
      element.onerror = reject;
      document.head.appendChild(element);
    });
  }

  // Initialize the remote container
  await container.init(__webpack_share_scopes__.default);

  // Get the factory for the module
  const factory = await container.get(module);

  // Execute the factory to retrieve the module
  const Module = factory();
  return Module;
};

export default loadRemoteModule;


export const createCustomElements = (
  components: { name: string; component: FC; props: string[] }[],
  react: typeof import('react'),
  reactDom: typeof import('react-dom/client')
) => {
  try {
    const theme = createTheme({
      // Define your theme here
    });

    components.forEach((Component) => {
      const webcomponent = reactToWebComponent(Component.component, react, reactDom);
      
      class ReactMfe extends HTMLElement {
        private props: any = {};
        private root: any | null = null; // Store ReactDOM root

        constructor() {
          super();
        }

        connectedCallback() {
          this.renderComponent(); // Initial render
        }

        disconnectedCallback() {
          // Cleanup the React instance when the component is removed
          if (this.root) {
            this.root.unmount();
            this.root = null;
          }
        }

        static get observedAttributes() {
          return Component.props;
        }

        attributeChangedCallback(attrName: string, oldValue: string, newValue: string) {
          console.log("Attribute changed as  : ", attrName, newValue, oldValue);
          this.props[attrName] = this.convert(newValue);
          this.renderComponent();
        }

        renderComponent() {
          const props = this.getProps();
          if (!this.root) {
            this.root = reactDom.createRoot(this);
          }
          this.root.render(
            <Suspense fallback={<></>}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component.component {...props} />
              </ThemeProvider>
            </Suspense>
          );
        }

        getProps() {
          const props: any = {};
          const ignoredAttributes = ['_ngcontent-arl-c76']; // Add any other attributes you want to ignore
        
          this.getAttributeNames().forEach((attr) => {
            // Ignore attributes that match Angular's internal naming convention
            if (!ignoredAttributes.includes(attr)) {
              props[attr] = JSON.parse(this.props[attr] || '{}');
            }
          });
          return { ...props };
        }

        convert(value: string) {
          if (value === 'true' || value === 'false') {
            return value === 'true';
          }
          if (!isNaN(Number(value))) {
            return Number(value);
          }
          if (/^{.*}$/.test(value)) {
            return JSON.parse(value);
          }
          return value; // Default case: return the value as is
        }
      }

      if (!customElements.get(Component.name)) {
        customElements.define(Component.name, ReactMfe);
      }
    });
  } catch (error) {
    console.error('Error creating custom elements:', error);
  }
};

export const attachPropsAndEvents = ({ props, events }: IAttachPropsAndEvents) => {
  return (ref: HTMLElement | null | any) => {
    if (!ref) return;

    // Attach props
    Object.keys(props).forEach((key) => {
      ref[key as any] = props[key];
    });

    // Attach events with cleanup
    const eventListeners = Object.keys(events).map((event) => {
      const handler = (e: CustomEvent) => events[event](e.detail);
      ref.addEventListener(event, handler);
      return { event, handler };
    });

    // Return cleanup function to remove event listeners on unmount
    return () => {
      eventListeners.forEach(({ event, handler }) => {
        ref.removeEventListener(event, handler);
      });
    };
  };
};



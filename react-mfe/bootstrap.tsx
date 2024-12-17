import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { exposableComponents } from "./utils/contstants";
import { createCustomElements } from "./utils/_helpers";

const initializeApp = async () => {
  try {
    // Create custom elements first
    createCustomElements(exposableComponents, React, ReactDOM);

    // Render the React application after custom elements are created
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error('Root element not found. Please check the HTML.');
    }

    // Render the React application after custom elements are created
    const root = ReactDOM.createRoot(rootElement as HTMLElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error initializing the app:", error);
  }
};

// Call the async function to initialize the app
initializeApp();

import React from "react";
import ReactDOM from "react-dom/client";
import { exposableComponents } from "./utils/contstants";
import { createCustomElements } from "./utils/_helpers";

export const defineAllElements = () => {
    createCustomElements(exposableComponents, React, ReactDOM);
}
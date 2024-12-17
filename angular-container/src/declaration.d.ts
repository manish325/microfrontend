import { Component } from "@angular/core";

declare module "react/define-custom-elements" {
    export const defineCustomElements : () => void;
}

declare module "angularMfe/header" {
    export const HomeComponent : Component;
}
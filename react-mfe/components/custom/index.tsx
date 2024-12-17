import { FC, useEffect } from "react";
import React from "react";
import { loadAngularComponent } from "../../utils/_helpers";
import Header from "mfe1/header";

export interface ICustomProps {
    name : string
}
export const Custom  : FC<ICustomProps> = ({name}) => {

useEffect(() => {
    const getComp = async () => {
        const headerComponent = await loadAngularComponent('header');
        console.log(headerComponent);
        
    }
    console.log(Header);
    getComp();
}, []);

return <>
<h1>This is custom component!</h1>
</>


}
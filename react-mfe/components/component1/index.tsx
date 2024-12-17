import React, {FC} from "react";
// import "./component2.scss";

export interface IComponent1Props {
    prop1 : string,
    prop2 : number,
    executer : () => void
}

const Component1 : FC<IComponent1Props> = ({prop1 = 'This is Default!', prop2=34, executer}) => {
    return (
        <>
            <h1>This is Component 1</h1>
            <p>This is going to be a Prop1 - {prop1}</p>
            <p>This is going to be a Prop2 - {prop2}</p>
            <button onClick={executer}>
                Click Here to execute!
            </button>
        </>
    )
};

export default Component1;
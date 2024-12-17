export interface IRoute {
    path : string,
    component: any
}

export interface ICustomComponentProps  {
    [key : string] : any
}

export interface ICustomComponentEvents {
    [key : string] : Function
}

export interface IAttachPropsAndEvents {
    props : ICustomComponentProps,
    events : ICustomComponentEvents
}

export interface ITask {
    name : string,
    id: any,
    description : string,
    completed : boolean
}
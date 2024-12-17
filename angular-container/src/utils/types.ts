export interface ITask {
    id : number,
    name : string,
    description : string,
    completed : boolean
}

export interface IUser {
    id : string,
    name : string,
    email : string,
    password : string,
    address : string,
    tasks : ITask[]
}

export interface IApplicationState {
    mfe : {
        user : IUser | null
    }
}
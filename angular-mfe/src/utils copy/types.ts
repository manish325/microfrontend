export interface ITask {
    name : string,
    description : string
}

export interface IUser {
    id : string,
    name : string,
    email : string,
    password : string,
    address : string,
    tasks : ITask[]
}
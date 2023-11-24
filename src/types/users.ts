import { type APIResponse } from "./api"

//* 1- User Service Arguments Types 
export type UserInfo = {
    name: {
        name: string
    }   
    email: {
        email: string
    }   
    author: {
        author: string
    }
    password: {
        password: string
    }
    credentials: {
        name: string
        password: string
    }
    data: {
        name: string
        password: string
        email: string
        author: string
    }
    fullData: {
        id: number
        name: string
        email: string
        author: string
        api_key: string
    }
}

//* 2- User Service Return Types 
export type UserResponse = {
    noData: APIResponse<'data'>
    token: APIResponse<'token'>
    data: APIResponse< UserInfo['fullData'] >
}

//* 3- User Service Interface 
export interface IUser {
    url: string
    getData: () =>                                                Promise<UserResponse['data']>
    removeData: () =>                                             Promise< UserResponse['noData'] >
    validate: ({ name, password }: UserInfo['credentials']) =>    Promise< UserResponse['token'] >
    changeName: ({ name }: UserInfo['name']) =>             Promise< UserResponse['noData'] >
    changeEmail: ({ email }: UserInfo['email']) =>          Promise< UserResponse['noData'] >
    changeAuthor: ({ author }: UserInfo['author']) =>       Promise< UserResponse['noData'] >
    changePassword: ({ password }: UserInfo['password']) => Promise< UserResponse['noData'] >
    insertNew: ({ name, password, email, author }: UserInfo['data']) => Promise< UserResponse['token'] >
}
import { type APIResponse } from "./api"

//* 1- User Service Arguments Types 
export type UserInfo = {
    token: {
        token: string
    }
    name: {
        name: string
        token: string
    }   
    email: {
        email: string
        token: string
    }   
    author: {
        author: string
        token: string
    }
    password: {
        password: string
        token: string
    }
    credentials: {
        name: string
        password: string
    }
    authInfo: {
        auth_provider: string
        code: string
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
    noData: APIResponse<null>
    token: APIResponse<'token'>
    data: APIResponse< UserInfo['fullData'] >
}

//* 3- User Service Interface 
export interface IUser {
    url: string 
    getData: ({ token }: UserInfo['token']) =>                          Promise< UserResponse['data'] >
    removeData: ({ token }: UserInfo['token']) =>                       Promise< UserResponse['noData'] >
    validate: ({ name, password }: UserInfo['credentials']) =>          Promise< UserResponse['token'] >
    openAuth: ({ auth_provider, code }: UserInfo['authInfo']) =>        Promise< UserResponse['token'] >
    changeName: ({ name, token }: UserInfo['name']) =>                  Promise< UserResponse['noData'] >
    changeEmail: ({ email, token }: UserInfo['email']) =>               Promise< UserResponse['noData'] >
    changeAuthor: ({ author, token }: UserInfo['author']) =>            Promise< UserResponse['noData'] >
    changePassword: ({ password, token }: UserInfo['password']) =>      Promise< UserResponse['noData'] >
    insertNew: ({ name, password, email, author }: UserInfo['data']) => Promise< UserResponse['token'] >
}
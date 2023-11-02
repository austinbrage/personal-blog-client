import { type APIResponse } from "./api"

type CommonState = {
    data: [] | null[]
    message: string
    hasFail: string
    hasError: unknown
    isLoading: boolean
}

//* 1- User Store State Types 
export type UserState = {
    userData: { data: UserInfo['fullData'][] | [] } & Omit<CommonState, 'data'> 
    userValidate: CommonState
    userNew: CommonState
    userName: CommonState
    userEmail: CommonState
    userAuthor: CommonState
    userPassword: CommonState
    userRemove: CommonState
}

//* 2- User Store Action Types 
export type UserAction = {
    getData: () =>                                                      Promise<void>
    removeData: () =>                                                   Promise<void>
    validate: ({ name, password }: UserInfo['credentials']) =>          Promise<void>
    changeName: ({ name }: UserInfo['name']) =>                         Promise<void>
    changeEmail: ({ email }: UserInfo['email']) =>                      Promise<void>
    changeAuthor: ({ author }: UserInfo['author']) =>                   Promise<void>
    changePassword: ({ password }: UserInfo['password']) =>             Promise<void>
    insertNew: ({ name, password, email, author }: UserInfo['data']) => Promise<void>
}

//* 3- User Service Arguments Types 
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

//* 4- User Service Return Types 
export type UserResponse = {
    noData: APIResponse<null>
    data: APIResponse< UserInfo['fullData'] >
}

//* 5- User Service Interface 
export interface IUser {
    url: string
    getData: () =>                                                Promise<UserResponse['data']>
    removeData: () =>                                             Promise< UserResponse['noData'] >
    validate: ({ name, password }: UserInfo['credentials']) =>    Promise< UserResponse['noData'] >
    changeName: ({ name }: UserInfo['name']) =>             Promise< UserResponse['noData'] >
    changeEmail: ({ email }: UserInfo['email']) =>          Promise< UserResponse['noData'] >
    changeAuthor: ({ author }: UserInfo['author']) =>       Promise< UserResponse['noData'] >
    changePassword: ({ password }: UserInfo['password']) => Promise< UserResponse['noData'] >
    insertNew: ({ name, password, email, author }: UserInfo['data']) => Promise< UserResponse['noData'] >
}
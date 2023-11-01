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
    getData: () => Promise<void>
    validate: ({ name, password }: UserInfo['credentials']) =>          Promise<void>
    changeName: ({ id, name }: UserInfo['idName']) =>                   Promise<void>
    changeEmail: ({ id, email }: UserInfo['idEmail']) =>                Promise<void>
    changeAuthor: ({ id, author }: UserInfo['idAuthor']) =>             Promise<void>
    changePassword: ({ id, password }: UserInfo['idPassword']) =>       Promise<void>
    insertNew: ({ name, password, email, author }: UserInfo['data']) => Promise<void>
    removeData: ({ id }: UserInfo['id']) =>                             Promise<void>
}

//* 3- User Service Arguments Types 
export type UserInfo = {
    id: {
        id: number
    }
    idName: {
        id: number
        name: string
    }   
    idEmail: {
        id: number
        email: string
    }   
    idAuthor: {
        id: number
        author: string
    }
    idPassword: {
        id: number
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
    url: URL
    getData: () =>                                                Promise<UserResponse['data']>
    validate: ({ name, password }: UserInfo['credentials']) =>    Promise< UserResponse['noData'] >
    changeName: ({ id, name }: UserInfo['idName']) =>             Promise< UserResponse['noData'] >
    changeEmail: ({ id, email }: UserInfo['idEmail']) =>          Promise< UserResponse['noData'] >
    changeAuthor: ({ id, author }: UserInfo['idAuthor']) =>       Promise< UserResponse['noData'] >
    changePassword: ({ id, password }: UserInfo['idPassword']) => Promise< UserResponse['noData'] >
    removeData: ({ id }: UserInfo['id']) =>                       Promise< UserResponse['noData'] >
    insertNew: ({ name, password, email, author }: UserInfo['data']) => Promise< UserResponse['noData'] >
}
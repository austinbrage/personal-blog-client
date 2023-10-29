import { type APIResponse } from "./api"

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

export type UserResponse = {
    noData: APIResponse<null>
    data: APIResponse< UserInfo['fullData'] >
}

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
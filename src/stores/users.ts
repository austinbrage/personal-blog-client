import { create } from 'zustand'
import { User } from '../services/users'
import { API_URL } from '../utils/config'
import { useData } from '../hooks/useData'
import { createMiddlewares } from '../helpers/middlewares'
import type { UserState, UserAction, UserInfo } from '../types/users'

const myMiddlewares = createMiddlewares<UserState>('USER_STORE')

const commonState = {
    data: [] as [],
    hasFail: '',
    message: '',
    hasError: false,
    isLoading: false
}

export const useUserStore = create<UserState>()( myMiddlewares( () => ({
    userData: commonState,
    userValidate: commonState,
    userNew: commonState,
    userName: commonState,
    userEmail: commonState,
    userAuthor: commonState,
    userPassword: commonState,
    userRemove: commonState
})))

export class UserActions implements UserAction {
    private userService: User

    constructor() {
        const USER_URL = new URL('/user', API_URL)
        this.userService = new User(USER_URL)
    }

    getData = async () => {
        const result = await useData(this.userService.getData())
        useUserStore.setState(({ userData: result}), false, 'SET_USER_DATA')
    }

    validate = async (data: UserInfo['credentials']) => {
        const result = await useData(this.userService.validate(data))

        useUserStore.setState(({ userValidate: result}), false, { 
            type: 'VALIDATE_USER', data 
        })
    }

    changeName = async (data: UserInfo['name']) => {
        const result = await useData(this.userService.changeName(data))

        useUserStore.setState(({ userName: result }), false, { 
            type: 'CHANGE_USER_NAME', data 
        })
    }

    changeEmail = async (data: UserInfo['email']) => {
        const result = await useData(this.userService.changeEmail(data))

        useUserStore.setState(({ userEmail: result }), false, { 
            type: 'CHANGE_USER_EMAIL', data 
        })
    }

    changeAuthor = async (data: UserInfo['author']) => {
        const result = await useData(this.userService.changeAuthor(data))

        useUserStore.setState(({ userAuthor: result }), false, { 
            type: 'CHANGE_USER_AUTHOR', data 
        })
    }

    changePassword = async (data: UserInfo['password']) => {
        const result = await useData(this.userService.changePassword(data))

        useUserStore.setState(({ userPassword: result }), false, { 
            type: 'CHANGE_USER_PASSWORD', data 
        })
    }

    insertNew = async (data: UserInfo['data']) => {
        const result = await useData(this.userService.insertNew(data))

        useUserStore.setState(({ userNew: result }), false, { 
            type: 'INSERT_NEW_USER', data 
        })
    }

    removeData = async () => {
        const result = await useData(this.userService.removeData())

        useUserStore.setState(({ userRemove: result }), false, 
            'REMOVE_USER'
        )
    }
}
import { addPath, PATHS, API_URL } from '../utils/config'
import type { IUser, UserInfo, UserResponse } from '../types/users'

export class User implements IUser {
    url: string

    constructor() {
        this.url = addPath(PATHS.USER, API_URL)
    }

    getData = async ({ token }: UserInfo['token']) => {
        const url = addPath('/data', this.url)
                
        const options = {
            headers: new Headers({'Authorization': `Bearer ${token}`}),
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['data']
    }

    validate = async ({ name, password }: UserInfo['credentials']) => {
        const url = addPath('/login', this.url)
        
        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ name, password })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['token']
    }

    openAuth = async ({ auth_provider, code }: UserInfo['authInfo']) => {
        const url = addPath('/oauth', this.url)

        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ auth_provider, code })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['token']
    }

    insertNew = async ({ name, password, email, author }: UserInfo['data']) => {
        const url = addPath('/register', this.url)

        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ name, password, email, author })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['token']
    }

    changeName = async ({ name, token }: UserInfo['name']) =>  {
        const url = addPath('/name', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ name })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeEmail = async ({ email, token }: UserInfo['email']) =>  {
        const url = addPath('/email', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ email })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeAuthor = async ({ author, token }: UserInfo['author']) =>  {
        const url = addPath('/author', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ author })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changePassword = async ({ password, token }: UserInfo['password']) =>  {
        const url = addPath('/password', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ password })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    removeData = async ({ token }: UserInfo['token']) => {
        const url = addPath('/data', this.url)
        
        const options = {
            method: 'DELETE',
            headers: new Headers({'Authorization': `Bearer ${token}`}),
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }
}
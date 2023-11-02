import { addPath } from '../utils/config'
import type { IUser, UserInfo, UserResponse } from '../types/users'

export class User implements IUser {
    url: string

    constructor(USER_URL: string) {
        this.url = USER_URL
    }

    getData = async () => {
        const url = addPath('/data', this.url)
                
        const response = await fetch(url)
        return await response.json() as UserResponse['data']
    }

    validate = async ({ name, password }: UserInfo['credentials']) => {
        const url = new URL(addPath('/login', this.url))

        url.searchParams.append('name', name)
        url.searchParams.append('password', password)

        const response = await fetch(url)
        return await response.json() as UserResponse['noData']
    }

    insertNew = async ({ name, password, email, author }: UserInfo['data']) => {
        const url = addPath('/register', this.url)

        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ name, password, email, author })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeName = async ({ name }: UserInfo['name']) =>  {
        const url = addPath('/name', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ name })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeEmail = async ({ email }: UserInfo['email']) =>  {
        const url = addPath('/email', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ email })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeAuthor = async ({ author }: UserInfo['author']) =>  {
        const url = addPath('/author', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ author })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changePassword = async ({ password }: UserInfo['password']) =>  {
        const url = addPath('/password', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ password })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    removeData = async () => {
        const url = addPath('/data', this.url)
        
        const options = {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'})
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }
}
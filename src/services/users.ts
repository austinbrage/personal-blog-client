import type { IUser, UserInfo, UserResponse } from '../types/users'

export class User implements IUser {
    url: URL

    constructor(USER_URL: URL) {
        this.url = USER_URL
    }

    getData = async () => {
        const url = new URL('/data', this.url)

        const response = await fetch(url)
        return await response.json() as UserResponse['data']
    }

    validate = async ({ name, password }: UserInfo['credentials']) => {
        const url = new URL('/login', this.url)

        url.searchParams.append('name', name)
        url.searchParams.append('password', password)

        const response = await fetch(url)
        return await response.json() as UserResponse['noData']
    }

    insertNew = async ({ name, password, email, author }: UserInfo['data']) => {
        const url = new URL('/register', this.url)

        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ name, password, email, author })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeName = async ({ name }: UserInfo['name']) =>  {
        const url = new URL('/name', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ name })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeEmail = async ({ email }: UserInfo['email']) =>  {
        const url = new URL('/email', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ email })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changeAuthor = async ({ author }: UserInfo['author']) =>  {
        const url = new URL('/author', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ author })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    changePassword = async ({ password }: UserInfo['password']) =>  {
        const url = new URL('/password', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ password })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }

    removeData = async () => {
        const url = new URL('/data', this.url)
        
        const options = {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'})
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['noData']
    }
}
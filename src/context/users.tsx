import { useState, createContext, type ReactNode } from "react"

type Context = {
    token: string,
    updateToken: (newToken: string) => void 
}

const intitialContext: Context = {
    token: '',
    updateToken: () => {}
}


export const UserContext = createContext<Context>(intitialContext)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {

    const [token, setToken] = useState<Context['token']>('')
    const updateToken: Context['updateToken'] = (newToken) => { setToken(newToken) }

    return (
        <UserContext.Provider value={{ token, updateToken }}>
            {children}
        </UserContext.Provider>
    )

}
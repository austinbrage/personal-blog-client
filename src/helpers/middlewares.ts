import { immer } from "zustand/middleware/immer"
import { persist, devtools, createJSONStorage } from "zustand/middleware"
import { type StateCreator } from "zustand"

export const createMiddlewares = <T>(storeName: string) => {
    const persistConfig = {
        name: storeName,
        storage: createJSONStorage(() => sessionStorage)
    }
    
    const devtoolsConfig = {
        name: storeName,
        enabled: process.env.NODE_ENV === 'development'
    }
    
    const myMiddlewares = (store: StateCreator<
        T, 
        [
            ["zustand/immer", never], 
            ["zustand/devtools", never], 
            ["zustand/persist", unknown]
        ], 
        []
    >) => immer(
        devtools(
            persist(store, persistConfig),
            devtoolsConfig
        )
    )

    return myMiddlewares
}



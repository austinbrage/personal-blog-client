import { useState, createContext, type ReactNode } from "react"

type Context = {
    addMode: boolean
    editMode: boolean
    updateAddMode: (newValue: boolean) => void
    updateEditMode: (newValue: boolean) => void
}

const intialContext: Context = {
    addMode: false,
    editMode: false,
    updateAddMode: () => {},
    updateEditMode: () => {},
}

export const ModeContext = createContext<Context>(intialContext)

export const ModeContextProvider = ({ children }: { children: ReactNode }) => {

    const [addMode, setAddMode] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)

    const updateAddMode = (newValue: boolean) => setAddMode(newValue)
    const updateEditMode = (newValue: boolean) => setEditMode(newValue)
    
    return (
        <ModeContext.Provider value={{ addMode, editMode, updateAddMode, updateEditMode }}>
            {children}
        </ModeContext.Provider>
    )
}
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

    const storedAddMode = localStorage.getItem('addMode')
    const initialAddMode = storedAddMode ? JSON.parse(storedAddMode) : false

    const storedEditMode = localStorage.getItem('editMode')
    const initialEditMode = storedEditMode ? JSON.parse(storedEditMode) : false 

    const [addMode, setAddMode] = useState<boolean>(initialAddMode)
    const [editMode, setEditMode] = useState<boolean>(initialEditMode)

    const updateAddMode = (newValue: boolean) => {
        setAddMode(newValue)
        localStorage.setItem('addMode', JSON.stringify(newValue))
    }
    const updateEditMode = (newValue: boolean) => {
        setEditMode(newValue)
        localStorage.setItem('editMode', JSON.stringify(newValue))
    }
    
    return (
        <ModeContext.Provider value={{ addMode, editMode, updateAddMode, updateEditMode }}>
            {children}
        </ModeContext.Provider>
    )
}
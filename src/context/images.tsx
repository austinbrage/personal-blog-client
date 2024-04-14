import { useState, createContext, type ReactNode } from 'react'

type Context = {
    imageToAdd: string | null
    imageToEdit: string | null
    updateImageToAdd: (newImage: Blob | null) => void
    updateImageToEdit: (newImage: Blob | null) => void
}

const initialContext: Context = {
    imageToAdd: null,
    imageToEdit: null,
    updateImageToAdd: () => {},
    updateImageToEdit: () => {}
}

export const ImageContext = createContext<Context>(initialContext)

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {

    const [imageToAdd, setImageToAdd] = useState<string | null>(null)
    const [imageToEdit, setImageToEdit] = useState<string | null>(null)

    const updateImageToAdd = (newImage: Blob | null) => {
        if(newImage === null) return setImageToAdd(null)
        const imageUrl = URL.createObjectURL(newImage)
        setImageToAdd(imageUrl)
    }

    const updateImageToEdit = (newImage: Blob | null) => {
        if(newImage === null) return setImageToEdit(null)
        const imageUrl = URL.createObjectURL(newImage)
        setImageToEdit(imageUrl)
    }

    return (
        <ImageContext.Provider value={{ imageToAdd, imageToEdit, updateImageToAdd, updateImageToEdit }}>
            {children}
        </ImageContext.Provider>
    )
}
import { useState, createContext, type ReactNode } from 'react'

type Context = {
    imagePost: string | null
    imageToAdd: string | null
    imageToEdit: string | null
    updateImagePost: (newImage: Blob | null) => void
    updateImageToAdd: (newImage: Blob | null) => void
    updateImageToEdit: (newImage: Blob | null) => void
}

const initialContext: Context = {
    imagePost: null,
    imageToAdd: null,
    imageToEdit: null,
    updateImagePost: () => {},
    updateImageToAdd: () => {},
    updateImageToEdit: () => {}
}

export const ImageContext = createContext<Context>(initialContext)

export const ImageContextProvider = ({ children }: { children: ReactNode }) => {

    const [imagePost, setImagePost] = useState<string | null>(null)
    const [imageToAdd, setImageToAdd] = useState<string | null>(null)
    const [imageToEdit, setImageToEdit] = useState<string | null>(null)

    const updateImagePost = (newImage: Blob | null) => {
        if(newImage === null) return setImagePost(null)
        const imageUrl = URL.createObjectURL(newImage)
        setImagePost(imageUrl)
    }

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
        <ImageContext.Provider value={{ imagePost, imageToAdd, imageToEdit, updateImagePost, updateImageToAdd, updateImageToEdit }}>
            {children}
        </ImageContext.Provider>
    )
}
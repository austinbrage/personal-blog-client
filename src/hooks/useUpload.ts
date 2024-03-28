import toast from 'react-hot-toast'
import { useState, useEffect, type ChangeEvent } from "react"
import { useSectionAddMultiple, useSectionEditFile } from './useSections'
import { useArticleEditFile } from './useArticles'
import { type ArticleInfo } from '../types/articles'
import { type ContentStyles } from '../types/sections'

export const useUploadArticle = ({ cleanModal }: { cleanModal: () => void }) => {

    const [file, setFile] = useState<File | null>(null)

    const { isPending, editArticle } = useArticleEditFile({ cleanModal })

    const handleChange = (insertedFile: ChangeEvent<HTMLInputElement>) => {
        if(!insertedFile.target.files) return 
        setFile(insertedFile.target.files[0])
    }

    useEffect(() => {
        
        if(!file) return
        
        if(file.size > 100 * 1024) {
            return void toast.error('Error, file must not exceed 100KB')
        }

        const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']

        if(!acceptedTypes.includes(file.type)) {
            return void toast.error('Error, file can only be jpeg, png or webp')
        }

    }, [file, setFile])

    const editArticleFile = (data: Omit<ArticleInfo['dataFile'], "image" | "token">) => {
        if(isPending || !file) return
        editArticle({ image: file, ...data })
    }

    return {
        handleArticleChange: handleChange,
        editArticleFile,
        file
    }
}

export const useUploadSections = ({ closeModal }: { closeModal: () => void }) => {

    const [file, setFile] = useState<File | null>(null)
    
    const { addMultipleSections, isPending } = useSectionAddMultiple({ closeModal })
    
    const handleChange = (insertedFile: ChangeEvent<HTMLInputElement>) => {
        if(!insertedFile.target.files) return 
        setFile(insertedFile.target.files[0])
    }
    
    useEffect(() => {

        if(!file) return
        
        if(file.type !== 'application/json') {
            return void toast.error('Error, file type must be application/json')
        }

        if(file.size > 1024 * 1024) {
            return void toast.error('Error, file must not exceed 1MB');
        }

        (async () => {
            try {
                const fileText = await file?.text()
                if(!fileText) throw new Error('Unable to read text')

                const parseData = JSON.parse(fileText)
                if(!parseData) throw new Error('Unable to parse objects')

                if(!isPending) addMultipleSections(parseData)
            } catch(err) {
                toast.error(`Failed at reading file: ${err}`)
            } finally {
                setFile(null)
            }
        })()
        
    }, [file, setFile, isPending, addMultipleSections])
    
    return {
        handleSectionChange: handleChange
    }
}

export const useUploadSectionEdit = ({ cleanModal }: { cleanModal: () => void }) => {

    const [file, setFile] = useState<File | null>(null)
    
    const { editSection, isPending } = useSectionEditFile({ cleanModal })
    
    const handleChange = (insertedFile: ChangeEvent<HTMLInputElement>) => {
        if(!insertedFile.target.files) return 
        setFile(insertedFile.target.files[0])
    }

    const cleanFile = () => setFile(null)

    useEffect(() => {
        
        if(!file) return
        
        if(file.size > 100 * 1024) {
            cleanFile()
            return void toast.error('Error, file must not exceed 100KB')
        }

        const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp']

        if(!acceptedTypes.includes(file.type)) {
            cleanFile()
            return void toast.error('Error, file can only be jpeg, png or webp')
        }

    }, [file, setFile])

    const editSectionFile = (data: Omit<ContentStyles<Blob>, "image">) => {
        if(isPending || !file) return
        editSection({ ...data, image: file })
    }

    return {
        handleSectionChange: handleChange,
        editSectionFile,
        cleanFile,
        file
    }   
}
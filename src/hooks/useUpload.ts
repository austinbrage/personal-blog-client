import toast from 'react-hot-toast'
import { useState, useEffect, type ChangeEvent } from "react"
import { useSectionAddMultiple } from './useSections'

export const useUpload = ({ closeModal }: { closeModal: () => void }) => {

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
        handleFileChange: handleChange
    }
}
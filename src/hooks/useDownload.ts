import { useMemo } from 'react'
import { useSectionData } from "./useSections"
import { useAPIStore } from '../stores/api'

export const useDownload = () => {

    const { sectionData } = useSectionData()
    const articleData = useAPIStore(state => state.articleData)

    const downloadAction = useMemo(() => {
        
        if(!articleData || !sectionData) return () => {}

        const requiredData = sectionData.map(({ id, sequence, styles, ...rest}) => ({
            ...rest,
            ...styles
        }))
    
        const sectionBlobData = new Blob(
            [JSON.stringify(requiredData)], 
            { type: 'application/json' }
        )

        const downloadAnchor = document.createElement('a')
        downloadAnchor.href = URL.createObjectURL(sectionBlobData)
        downloadAnchor.download = `template_${articleData?.name.toLowerCase()}`
        
        return () => {
            document.body.appendChild(downloadAnchor)
            downloadAnchor.click()
            document.body.removeChild(downloadAnchor)
        }

    }, [sectionData, articleData])

    return downloadAction
}   
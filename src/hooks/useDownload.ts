import { useMemo } from 'react'
import { useSectionData } from "./useSections"
import { useAPIStore } from '../stores/api'

export const useDownload = () => {

    const { rawSectionData } = useSectionData()
    const articleData = useAPIStore(state => state.articleData)

    const downloadAction = useMemo(() => {
        
        if(!articleData || !rawSectionData) return () => {}

        const sectionBlobData = new Blob(
            [JSON.stringify(rawSectionData)], 
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

    }, [rawSectionData, articleData])

    return downloadAction
}   
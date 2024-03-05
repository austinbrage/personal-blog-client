import { useState, createContext, type ReactNode } from 'react'
import { type ProcessedSection } from '../types/sections'

type Context = {
    sectionId: number
    sectionData: ProcessedSection | null
    updateSectionId: (newId: number) => void
    updateSectionData: (newData: ProcessedSection) => void
}

const initialContext: Context = {
    sectionId: 0,
    sectionData: null,
    updateSectionId: () => {},
    updateSectionData: () => {},
}


export const SectionContext = createContext<Context>(initialContext)

export const SectionContextProvider = ({ children }: { children: ReactNode }) => {

    const storedId = localStorage.getItem('sectionId')
    const initialId = !isNaN(Number(storedId)) ? Number(storedId) : 0

    const storedData = localStorage.getItem('sectionData')
    const initialData = storedData ? JSON.parse(storedData) : null

    const [sectionId, setSectionId] = useState<number>(initialId)
    const [sectionData, setSectionData] = useState<Context['sectionData']>(initialData)

    const updateSectionId = (newId: number) => {
        setSectionId(newId)
        localStorage.setItem('sectionId', newId.toString())
    }
    const updateSectionData = (newData: Context['sectionData']) => {
        setSectionData(newData)
        localStorage.setItem('sectionData', JSON.stringify(newData))   
    }

    return (
        <SectionContext.Provider value={{ sectionId, sectionData, updateSectionData, updateSectionId }}>
            {children}
        </SectionContext.Provider>
    )
}
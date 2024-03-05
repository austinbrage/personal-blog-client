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

    const [sectionId, setSectionId] = useState<number>(0)
    const [sectionData, setSectionData] = useState<Context['sectionData']>(null)

    const updateSectionId = (newId: number) => setSectionId(newId)
    const updateSectionData = (newData: Context['sectionData']) => setSectionData(newData)

    return (
        <SectionContext.Provider value={{ sectionId, sectionData, updateSectionData, updateSectionId }}>
            {children}
        </SectionContext.Provider>
    )
}
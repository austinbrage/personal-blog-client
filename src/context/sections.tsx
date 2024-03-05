import { useState, createContext, type ReactNode } from 'react'
import type { RawSection, ProcessedSection } from '../types/sections'

type OmitedAttr = "content_type" | "image_url" | "border_radius" | "width" | "height"

type Context = {
    sectionId: number
    sectionData: ProcessedSection | null
    newSectionData: {
        raw?: Omit<RawSection, OmitedAttr>
        processed?: Omit<ProcessedSection, "id">
    }
    updateSectionId: (newId: number) => void
    updateSectionData: (newData: ProcessedSection) => void
    updateNewSectionData: (newData: Omit<ProcessedSection, "id">) => void
}

const initialContext: Context = {
    sectionId: 0,
    sectionData: null,
    newSectionData: {},
    updateSectionId: () => {},
    updateSectionData: () => {},
    updateNewSectionData: () => {},
}

export const SectionContext = createContext<Context>(initialContext)

export const SectionContextProvider = ({ children }: { children: ReactNode }) => {

    const [sectionId, setSectionId] = useState<number>(0)
    const [sectionData, setSectionData] = useState<Context['sectionData']>(null)
    const [newSectionData, setNewSectionData] = useState<Context['newSectionData']>({})

    const updateSectionId = (newId: number) => setSectionId(newId)
    const updateSectionData = (newData: Context['sectionData']) => setSectionData(newData)
    
    const updateNewSectionData = (newData: Omit<ProcessedSection, "id">) => {
        const raw = {
            content: newData.content,
            text_color: newData.styles.color,
            font_size: newData.styles.fontSize,
            text_align: newData.styles.textAlign,
            margin_top: newData.styles.marginTop,
            font_weight: newData.styles.fontWeight,
            font_family: newData.styles.fontFamily,
            line_height: newData.styles.lineHeight
        }
        setNewSectionData({ raw, processed: newData })
    }

    return (
        <SectionContext.Provider value={{ sectionId, sectionData, newSectionData, updateNewSectionData, updateSectionData, updateSectionId }}>
            {children}
        </SectionContext.Provider>
    )
}
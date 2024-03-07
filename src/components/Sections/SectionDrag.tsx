import { useState, useEffect, useDeferredValue } from "react"
import { SectionContent } from "./SectionContent"
import { useDragAndDrop } from "@formkit/drag-and-drop/react"
import type { SectionInfo, ProcessedSection } from "../../types/sections"

type Props = {
    sectionData: ProcessedSection[]
    updateChangedData: (newData: SectionInfo['idSequence'][]) => void
}

export function SectionDrag({ sectionData, updateChangedData }: Props) {

    const [parent, sections] = useDragAndDrop<HTMLDivElement, ProcessedSection>(sectionData)
    const [isStale, setIsStale] = useState<boolean>(false)

    const deferredSections = useDeferredValue<ProcessedSection[]>(sections)

    useEffect(() => {
        if(isStale || deferredSections.length === 0) return 

        const changedSequences = deferredSections
            .map((elem, index) => ({ 
                id: elem.id, 
                sequence: elem.sequence,
                newSequence: index + 1
            }))
            .filter(elem => elem.sequence !== elem.newSequence)
            .map(elem => ({id: elem.id, sequence: elem.newSequence}))

        if(changedSequences.length > 0) updateChangedData(changedSequences)

    }, [isStale, deferredSections, updateChangedData])

    useEffect(() => {
        const isSectionStale = sections !== deferredSections
        if(isStale !== isSectionStale) setIsStale(isSectionStale)
    }, [isStale, sections, deferredSections])

    return (
        <div ref={parent}>
            {sections.map((elem) => (
                <div
                    key={elem.id}
                    data-label={elem.id}
                    className={`
                        flex items-center justify-center h-max px-4 mt-3 w-full cursor-pointer
                        ${elem.styles.textAlign === 'left' ? 'justify-start' : ''}
                        ${elem.styles.textAlign === 'right' ? 'justify-end'  : ''}
                        ${elem.styles.textAlign === 'center' ? 'justify-center' : ''}
                    `}
                >   
                    <SectionContent currentData={elem}/>
                </div>
            ))}
        </div>
    )
}
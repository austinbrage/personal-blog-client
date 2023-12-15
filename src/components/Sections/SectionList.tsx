import { SectionContent } from './SectionContent'
import { useState } from 'react'
import { IoMdCreate } from 'react-icons/io'
import { useAPIStore } from '../../stores/api'
import { useSectionData } from '../../hooks/useSections'
import type { ContentStyles, ProcessedSection } from '../../types/sections'

type Props = {
    newData: ContentStyles
    editData: ContentStyles
    openModalDelete: () => void
    openModalContent: () => void
}

export function SectionList({ newData, editData, openModalDelete, openModalContent }: Props) {

    const { sectionData } = useSectionData()

    const addMode = useAPIStore(state => state.addMode)
    const editMode = useAPIStore(state => state.editMode)
    const sectionId = useAPIStore(state => state.sectionId)

    const updateEditMode = useAPIStore(state => state.updateEditMode)
    const updateSectionId = useAPIStore(state => state.updateSectionId)
    const updateSectionData = useAPIStore(state => state.updateSectionData)
    
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const handleMouseLeave = () => setHoveredIndex(null)
    const handleMouseEnter = (index: number) => setHoveredIndex(index)

    const handleDelete = (currentSection: ProcessedSection) => {
        updateSectionId(currentSection.id)
        updateSectionData(currentSection)
        openModalDelete()
    }

    const handleEdition = (currentSection: ProcessedSection) => {
        updateSectionId(currentSection.id)
        updateSectionData(currentSection)

        updateEditMode(true)
        openModalContent()
    }

    if(sectionData.length === 0) return (
        <article className='ms-10 mb-24 text-2xl italic tracking-wider'>
            
            {(addMode === true) ? (
                <div className='grid grid-cols-[4fr,1fr]'>
                    <SectionContent currentData={newData}/>
                </div>
            ) : (
                <p>(No content)</p>
            )}
            
        </article>
    )

    return (
        <article className='ms-10 mb-24'>
            {sectionData.map((elem, index) => (
                <div key={elem.id} className='grid grid-cols-[4fr,1fr] items-center h-max mt-3'>

                    <div 
                        className={
                            index === hoveredIndex 
                                ? `scale-110 transition-all duration-300
                                    ${elem.styles.textAlign === 'left' ? 'translate-x-12' : ''}
                                    ${elem.styles.textAlign === 'right' ? '-translate-x-12' : ''}`.trim() 
                                : 'transition-all duration-300'
                        }
                    >
                        {
                            (editMode === true && sectionId === elem.id)
                                ? <SectionContent currentData={editData}/>
                                : <SectionContent currentData={elem}/>
                        }
                    </div>

                    <div 
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => handleMouseEnter(index)}
                        className='flex items-center justify-end p-4 col-span-1 gap-3 h-10 z-0'
                    >
                        <button
                            type='button'
                            onClick={() => handleEdition(elem)}
                            className="inline-flex items-center w-max text-sm font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            <span className="text-lg me-2">
                                <IoMdCreate/>
                            </span>
                            Edit
                        </button>

                        <button 
                            type='button'
                            onClick={() => handleDelete(elem)}
                            className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                        </button>
                    </div>

                </div>
            ))}

            {(addMode === true) && (
                <div className='grid grid-cols-[4fr,1fr]'>
                    <SectionContent currentData={newData}/>
                </div>
            )}

        </article>
    )
}
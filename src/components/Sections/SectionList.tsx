import { useState, useEffect, useContext } from 'react'
import { ModeContext } from '../../context/modes'
import { ImageContext } from '../../context/images'
import { SectionContext } from '../../context/sections'
import { SectionContent } from './SectionContent'
import { SectionOrder } from './SectionOrder'
import { IoMdCreate } from 'react-icons/io'
import { FaArrowRightArrowLeft } from "react-icons/fa6"
import { useSectionData } from '../../hooks/useSections'
import type { ContentStyles, ProcessedSection } from '../../types/sections'

type Props = {
    newData: ContentStyles<string>
    editData: ContentStyles<string>
    openModalDelete: () => void
    openModalContent: () => void
}

export function SectionList({ newData, editData, openModalDelete, openModalContent }: Props) {

    const { sectionData } = useSectionData()

    const { imageToAdd, imageToEdit } = useContext(ImageContext)
    const { addMode, editMode, updateEditMode } = useContext(ModeContext)
    const { sectionId, updateSectionId, updateSectionData } = useContext(SectionContext)
    
    const [changeMode, setChangeMode] = useState<boolean>(false)
    const [showButtons, setShowButtons] = useState<boolean>(true)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    const handleMouseLeave = () => setHoveredIndex(null)
    const handleMouseEnter = (index: number) => setHoveredIndex(index)

    const updateChangeMode = (newMode: 'invert' | 'off') => {
        newMode === 'invert' && setChangeMode(prevState => !prevState)
        newMode === 'off' && setChangeMode(false)
    }

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
    
    useEffect(() => {
        setShowButtons(!changeMode)
    }, [changeMode])

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
        <article className='relative ms-0 md:ms-10 mt-12 mb-24'>

            <SectionOrder {...{sectionData, changeMode, updateChangeMode}}/>

            {(changeMode === false) && sectionData.map((elem, index) => (
                <div 
                    key={elem.id} 
                    className={`
                        items-center h-max mt-3
                        ${
                            showButtons 
                                ? 'grid grid-cols-[4fr,1fr]' 
                                : `
                                    flex w-full md:w-4/5 ms-0 md:ms-10 lg:ms-24
                                    ${elem.styles.textAlign === 'left' ? 'justify-start' : ''}
                                    ${elem.styles.textAlign === 'right' ? 'justify-end'  : ''}
                                    ${elem.styles.textAlign === 'center' ? 'justify-center' : ''}
                                `
                        }
                    `.trim()}  
                >
                    
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
                                ? <SectionContent imageUrl={imageToEdit} currentData={editData}/>
                                : <SectionContent currentData={elem}/>
                        }
                    </div>

                    <div 
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={() => handleMouseEnter(index)}
                        className={`
                            items-center justify-end p-4 col-span-1 gap-3 h-10 z-0
                            ${showButtons ? 'flex' : 'hidden'}
                        `}
                    >
                        <button
                            type='button'
                            onClick={() => handleEdition(elem)}
                            className="inline-flex items-center w-max text-sm font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            <span className="text-lg me-2">
                                <IoMdCreate/>
                            </span>
                            <span className='hidden md:inline'>
                                Edit
                            </span>
                        </button>

                        <button 
                            type='button'
                            onClick={() => handleDelete(elem)}
                            className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <span className='hidden md:inline'>
                                Delete
                            </span>
                        </button>
                    </div>

                </div>
            ))}

            {(addMode === true) && (
                <div className='grid grid-cols-[4fr,1fr]'>
                    <SectionContent imageUrl={imageToAdd} currentData={newData}/>
                </div>
            )}

            <div className='group fixed right-0 top-20 w-10 h-3/4 max-h-screen cursor-pointer'>
                <div 
                    onClick={() => setShowButtons(prev => !prev)}
                    className='relative h-full grid place-content-center rounded-s-lg transition-all duration-500 -right-10 group-hover:right-0 bg-[#18181B]'
                >
                    <span className='text-xl'>
                        <FaArrowRightArrowLeft/>
                    </span>
                </div>
            </div>

        </article>
    )
}
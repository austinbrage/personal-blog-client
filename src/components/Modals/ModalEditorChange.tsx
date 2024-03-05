import Draggable from 'react-draggable'
import { Selector } from "../Selector"
import { GeneralTab } from "../Tabs/General"
import { ContentTab } from "../Tabs/Content"
import { ColorTab } from "../Tabs/Color"
import { SizeTab } from "../Tabs/Size"
import { WeightTab } from "../Tabs/Weight"
import { AlignTab } from "../Tabs/Align"
import { MarginTab } from "../Tabs/Margin"
import { LineHeightTab } from "../Tabs/Line"
import { FamilyTab } from "../Tabs/Family"
import { WidthTab } from '../Tabs/Width'
import { HeightTab } from '../Tabs/height'
import { RadiusTab } from '../Tabs/Radius'
import { ImageTab, ContentAltTab } from '../Tabs/Image'
import { IoArrowRedoCircleSharp } from "react-icons/io5"
import { useEscape } from "../../hooks/useCommands"
import { defaultOptions } from '../../enums/general'
import { useSectionEdit } from "../../hooks/useSections"
import { SectionContext } from '../../context/sections'
import { ModeContext } from '../../context/modes'
import { useMemo, useState, useEffect, useContext, type RefObject } from "react"
import type { DraggableEvent, DraggableData } from 'react-draggable'
import type { ContentStyles, EditorTabs } from "../../types/sections"

type Position = { x: number; y: number }

type Props = { 
    modalRef: RefObject<HTMLDivElement> 
    editData: ContentStyles
    setEditData: React.Dispatch<React.SetStateAction<ContentStyles>>
}

export function ModalEditorChange({ editData, setEditData, modalRef }: Props) {
    
    const { isPending, editSection } = useSectionEdit({ cleanModal: () => {
        updateEditMode(false)
        setEditData(originalData) 
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    } })

    const { sectionData } = useContext(SectionContext)
    const { updateEditMode } = useContext(ModeContext)

    const [edition, setEdition] = useState<EditorTabs>('general')
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    
    const originalData = useMemo(() => ({
        content: sectionData?.content ?? '', 
        image_url: sectionData?.image_url ?? null,
        styles: sectionData?.styles ?? defaultOptions.styles,
        content_type: sectionData?.content_type ?? 'paragraph'
    }), [sectionData])

    const handleDrag = (_e: DraggableEvent, { deltaX, deltaY }: DraggableData) => {
        setPosition(prevPos => ({ x: prevPos.x + deltaX, y: prevPos.y + deltaY }))
    }

    const handleEditSection = () => {
        if(isPending) return
        editSection(editData)
    }   
    
    const closeModal = () => {
        updateEditMode(false)
        setEditData(originalData) 
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }
    
    useEffect(() => {
        setEditData(originalData)
    }, [setEditData, originalData])
    
    useEffect(() => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }, [modalRef])

    useEscape({
        menuRef: modalRef,
        closeMenu: closeModal
    })
    
    return (
        <div 
            tabIndex={-1} 
            ref={modalRef} 
            aria-hidden="true" 
            id="content-modal-2" 
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >        
            <Draggable 
                onDrag={handleDrag} 
                handle=".modal-header-2"
                defaultPosition={position}
            >
                <div className="relative top-[-10%] p-4 w-full max-w-md max-h-full">
                    <div className="relative rounded-lg shadow backdrop-blur-sm bg-[rgba(17,24,39,0.9)]">

                        <div className="relative flex h-[400px] w-[700px] justify-between items-start">

                            <Selector
                                identifier="change"
                                changeEditorTab={setEdition}
                            />

                            <div className="modal-header-2 h-20 absolute right-[18rem] w-[320px] cursor-grab flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    New Section
                                </h3>
                                <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>     

                            <div className="absolute top-[5rem] left-[5rem]">

                                {(edition === 'general') && (
                                    <GeneralTab
                                        currentContentType={editData.content_type}
                                        changeStyles={(newData) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: newData.newStyles,
                                            content_type: newData.newContentType
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'content' && editData.content_type !== 'image') && (
                                    <ContentTab 
                                        currentContent={editData.content} 
                                        changeContent={(newContent) => setEditData(prevData => ({
                                            ...prevData,
                                            content: newContent
                                        }))} 
                                    />
                                )}
                                
                                {(edition === 'content' && editData.content_type === 'image') && (
                                    <ContentAltTab 
                                        currentContent={editData.content} 
                                        changeContent={(newContent) => setEditData(prevData => ({
                                            ...prevData,
                                            content: newContent
                                        }))} 
                                    />
                                )}
                                
                                {(edition === 'content' && editData.content_type === 'image') && (
                                    <ImageTab 
                                        currentImage={editData.image_url} 
                                        changeImage={(newImage) => setEditData(prevData => ({
                                            ...prevData,
                                            image_url: newImage
                                        }))} 
                                    />
                                )}
                                
                                {(edition === 'color') && (
                                    <ColorTab 
                                        currentColor={editData.styles.color} 
                                        changeColor={(newColor) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, color: newColor}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'size') && (
                                    <SizeTab 
                                        currentSize={editData.styles.fontSize} 
                                        changeSize={(newSize) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, fontSize: newSize}
                                        }))}
                                    />
                                )}

                                {(edition === 'family') && (
                                    <FamilyTab 
                                        currentFamily={editData.styles.fontFamily} 
                                        changeFamily={(newFamily) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, fontFamily: newFamily}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'weight') && (
                                    <WeightTab 
                                        currentWeight={+editData.styles.fontWeight} 
                                        changeWeight={(newWeight) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, fontWeight: newWeight}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'alignment') && (
                                    <AlignTab 
                                        currentAlign={editData.styles.textAlign} 
                                        changeAlign={(newAlign) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, textAlign: newAlign}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'margin') && (
                                    <MarginTab 
                                        currentMargin={editData.styles.marginTop} 
                                        changeMargin={(newMargin) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, marginTop: newMargin}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'line') && (
                                    <LineHeightTab 
                                        currentLine={editData.styles.lineHeight} 
                                        changeLine={(newLine) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, lineHeight: newLine}
                                        }))}
                                    />
                                )}

                                {(edition === 'width') && (
                                    <WidthTab 
                                        currentWidth={editData.styles.width} 
                                        changeWidth={(newWidth) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, width: newWidth}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'height') && (
                                    <HeightTab 
                                        currentHeight={editData.styles.height} 
                                        changeHeight={(newHeight) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, height: newHeight}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'radius') && (
                                    <RadiusTab 
                                        currentRadius={editData.styles.borderRadius} 
                                        changeRadius={(newRadius) => setEditData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, borderRadius: newRadius}
                                        }))}
                                    />
                                )}

                            </div>
                            
                            <button 
                                type="button" 
                                onClick={handleEditSection}
                                className="absolute right-[18rem] bottom-0 inline-flex items-center tracking-wide bg-gradient-to-r text-white from-slate-900 to-slate-700 hover:scale-105 transition-all duration-200 focus:ring-4 focus:outline-nonse font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                APPLY
                                <span className="text-2xl ms-2"><IoArrowRedoCircleSharp/></span>
                            </button>
                        </div>

                    </div>
                </div>

            </Draggable>
        </div>    
    )
}
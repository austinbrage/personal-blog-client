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
import { defaultOptions } from '../../enums/general'
import { IoArrowRedoCircleSharp } from "react-icons/io5"
import { useAPIStore } from "../../stores/api"
import { useEscape } from "../../hooks/useCommands"
import { useSectionAdd } from "../../hooks/useSections"
import { useState, useEffect, type RefObject} from "react"
import type { ContentStyles, EditorTabs } from "../../types/sections"
import type { DraggableEvent, DraggableData } from 'react-draggable'

type Position = { x: number; y: number }

type Props = { 
    modalRef: RefObject<HTMLDivElement> 
    newData: ContentStyles
    setNewData: React.Dispatch<React.SetStateAction<ContentStyles>>
}

export function ModalEditorAdd({ newData, setNewData, modalRef }: Props) {
    
    const { isPending, addSection } = useSectionAdd()
    const updateAddMode = useAPIStore(state => state.updateAddMode)

    const [edition, setEdition] = useState<EditorTabs>('general')
    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })

    const handleDrag = (_e: DraggableEvent, { deltaX, deltaY }: DraggableData) => {
        setPosition(prevPos => ({ x: prevPos.x + deltaX, y: prevPos.y + deltaY }))
    }

    const handleAddSection = () => {
        if(isPending) return
        addSection(newData)
        closeModal()
    }   
    
    const closeModal = () => {
        updateAddMode(false)
        setNewData(defaultOptions) 
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }
    
    useEffect(() => {
        setNewData(defaultOptions)
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }, [modalRef, setNewData])

    useEscape({
        menuRef: modalRef,
        closeMenu: closeModal
    })
   
    return (
        <div 
            tabIndex={-1} 
            ref={modalRef} 
            aria-hidden="true" 
            id="content-modal-1" 
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >        
            <Draggable 
                onDrag={handleDrag} 
                handle=".modal-header-1"
                defaultPosition={position}
            >
                <div className="relative top-[-10%] p-4 w-full max-w-md max-h-full">
                    <div className="relative rounded-lg shadow backdrop-blur-sm bg-[rgba(17,24,39,0.9)]">

                        <div className="relative flex h-[400px] w-[700px] justify-between items-start">

                            <Selector
                                identifier="add"
                                changeEditorTab={setEdition}
                            />

                            <div className="modal-header-1 h-20 absolute right-[18rem] w-[320px] cursor-grab flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
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
                                        currentStyles={newData.styles}
                                        changeStyles={(newStyles) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: newStyles
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'content') && (
                                    <ContentTab 
                                        currentContent={newData.content} 
                                        changeContent={(newContent) => setNewData(prevData => ({
                                            ...prevData,
                                            content: newContent
                                        }))} 
                                    />
                                )}
                                
                                {(edition === 'color') && (
                                    <ColorTab 
                                        currentColor={newData.styles.color} 
                                        changeColor={(newColor) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, color: newColor}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'size') && (
                                    <SizeTab 
                                        currentSize={newData.styles.fontSize} 
                                        changeSize={(newSize) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, fontSize: newSize}
                                        }))}
                                    />
                                )}

                                {(edition === 'family') && (
                                    <FamilyTab 
                                        currentFamily={newData.styles.fontFamily} 
                                        changeFamily={(newFamily) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, fontFamily: newFamily}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'weight') && (
                                    <WeightTab 
                                        currentWeight={+newData.styles.fontWeight} 
                                        changeWeight={(newWeight) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, fontWeight: newWeight}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'alignment') && (
                                    <AlignTab 
                                        currentAlign={newData.styles.textAlign} 
                                        changeAlign={(newAlign) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, textAlign: newAlign}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'margin') && (
                                    <MarginTab 
                                        currentMargin={newData.styles.marginTop} 
                                        changeMargin={(newMargin) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, marginTop: newMargin}
                                        }))}
                                    />
                                )}
                                
                                {(edition === 'line') && (
                                    <LineHeightTab 
                                        currentLine={newData.styles.lineHeight} 
                                        changeLine={(newLine) => setNewData(prevData => ({
                                            ...prevData,
                                            styles: {...prevData.styles, lineHeight: newLine}
                                        }))}
                                    />
                                )}

                            </div>
                            
                            <button 
                                type="button" 
                                onClick={handleAddSection}
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
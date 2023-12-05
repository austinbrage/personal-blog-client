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
import { generalOptions } from '../../enums/general'
import { IoArrowRedoCircleSharp } from "react-icons/io5"
import { useAPIStore } from "../../stores/api"
import { useEscape } from "../../hooks/useCommands"
import { useSectionAdd } from "../../hooks/useSections"
import { useState, useEffect, type RefObject} from "react"
import type { Styles } from "../../types/sections"
import type { DraggableEvent, DraggableData } from 'react-draggable'

type Position = { x: number; y: number }
type Props = { modalRef: RefObject<HTMLDivElement> }
type EditorTabs = 'general' | 'content' | 'color' | 'size' | 'family' | 'weight' | 'alignment' | 'margin' | 'line'

export function ModalEditorAdd({ modalRef }: Props) {
    
    const defaultStyles = generalOptions[1].value
    const updateAddMode = useAPIStore(state => state.updateAddMode)
    const updateNewSectionData = useAPIStore(state => state.updateNewSectionData)

    const [edition, setEdition] = useState<EditorTabs>('general')

    const [content, setContent] = useState<string>('New article section')
    const [styles, setStyles] = useState<Styles>(defaultStyles)

    const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
    
    const { isPending, addSection } = useSectionAdd()

    const handleAddSection = () => {
        if(isPending) return
        addSection()
        closeModal()
    }   

    const handleDrag = (_e: DraggableEvent, { deltaX, deltaY }: DraggableData) => {
        setPosition(prevPos => ({ x: prevPos.x + deltaX, y: prevPos.y + deltaY }))
    }
    
    const closeModal = () => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
        setContent('New article section') 
        setStyles(defaultStyles) 
        updateAddMode(false)
    }
    
    useEffect(() => {
        updateNewSectionData({ content, styles })
    }, [content, styles, updateNewSectionData])

    useEffect(() => {
        setStyles(defaultStyles) 
        setContent('New article section') 
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }, [modalRef, setContent, setStyles, defaultStyles])

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
                                        currentStyles={styles}
                                        changeStyles={setStyles}
                                    />
                                )}
                                
                                {(edition === 'content') && (
                                    <ContentTab 
                                        currentContent={content} 
                                        changeContent={setContent} 
                                    />
                                )}
                                
                                {(edition === 'color') && (
                                    <ColorTab 
                                        currentColor={styles.color} 
                                        changeColor={
                                            (newColor) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                color: newColor
                                            }))
                                        } 
                                    />
                                )}
                                
                                {(edition === 'size') && (
                                    <SizeTab 
                                        currentSize={styles.fontSize} 
                                        changeSize={
                                            (newSize) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                fontSize: newSize                                          
                                            }))
                                        } 
                                    />
                                )}

                                {(edition === 'family') && (
                                    <FamilyTab 
                                        currentFamily={styles.fontFamily} 
                                        changeFamily={
                                            (newFamily) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                fontFamily: newFamily                                          
                                            }))
                                        } 
                                    />
                                )}
                                
                                {(edition === 'weight') && (
                                    <WeightTab 
                                        currentWeight={+styles.fontWeight} 
                                        changeWeight={
                                            (newSize) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                fontWeight: newSize                                          
                                            }))
                                        } 
                                    />
                                )}
                                
                                {(edition === 'alignment') && (
                                    <AlignTab 
                                        currentAlign={styles.textAlign} 
                                        changeAlign={
                                            (newAlign) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                textAlign: newAlign                                          
                                            }))
                                        } 
                                    />
                                )}
                                
                                {(edition === 'margin') && (
                                    <MarginTab 
                                        currentMargin={styles.marginTop} 
                                        changeMargin={
                                            (newMargin) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                marginTop: newMargin                                          
                                            }))
                                        } 
                                    />
                                )}
                                
                                {(edition === 'line') && (
                                    <LineHeightTab 
                                        currentLine={styles.lineHeight} 
                                        changeLine={
                                            (newHeight) => setStyles(prevStyles => ({
                                                ...prevStyles,
                                                lineHeight: newHeight                                          
                                            }))
                                        } 
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

// export function ModalEditorChange({ modalRef }: Props) {

// }
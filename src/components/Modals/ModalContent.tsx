import { useAPIStore } from "../../stores/api"
import { useEscape } from "../../hooks/useCommands"
import { SelectOption } from "../Dropdowns/SelectOption"
import { useSectionEdit } from "../../hooks/useSections"
import { useState, useEffect, useCallback, type RefObject, type FormEvent } from "react"
import Draggable, { type DraggableEvent, type DraggableData } from 'react-draggable'
import { type ProcessedSection } from "../../types/sections"

type Props = {
    mode: 'add' | 'edit'
    modalRef: RefObject<HTMLDivElement>
}

type Position = { x: number; y: number }
type Styles = Pick<ProcessedSection, "styles">['styles']

const defualtLabels: Styles = {
    color: 'Select color',
    fontSize: 'Select font', 
    marginTop: 'Select margin', 
    textAlign: 'Select align', 
    fontWeight: 'Select weight', 
    fontFamily: 'Select family', 
    lineHeight: 'Select height'
}

export function ModalContent({ mode, modalRef }: Props) {

    const { isPending, editSection } = useSectionEdit()

    const sectionData = useAPIStore(state => state.sectionData)
    const updateAddMode = useAPIStore(state => state.updateAddMode)
    const updateEditMode = useAPIStore(state => state.updateEditMode)
    const updateNewSectionData = useAPIStore(state => state.updateNewSectionData)

    const [content, setContent] = useState<string>('')
    const [styles, setStyles] = useState<Styles>(sectionData?.styles ?? defualtLabels)

    const [position1, setPosition1] = useState<Position>({ x: 0, y: 0 })
    const [position2, setPosition2] = useState<Position>({ x: 0, y: 0 })
    
    const handleDrag1 = (_e: DraggableEvent, { deltaX, deltaY }: DraggableData) => {
        setPosition1(prevPos => ({ x: prevPos.x + deltaX, y: prevPos.y + deltaY }))
    }
    const handleDrag2 = (_e: DraggableEvent, { deltaX, deltaY }: DraggableData) => {
        setPosition2(prevPos => ({ x: prevPos.x + deltaX, y: prevPos.y + deltaY }))
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isPending) return

        mode === 'add' || editSection()
        closeModal()
        //? add new section or edit existing one 
    }   

    const resetValues = useCallback(() => {
        mode === 'add' 
            ? setContent('') 
            : setContent(sectionData?.content ?? '')

        mode === 'add' 
            ? setStyles(defualtLabels) 
            : setStyles(sectionData?.styles ?? defualtLabels)
    }, [mode, setContent, setStyles, sectionData])
    
    const closeModal = () => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
        updateEditMode(false)
        updateAddMode(false)
        resetValues()
    }
    
    useEffect(() => {
        resetValues()
    }, [mode, setContent, setStyles, sectionData, resetValues])
    
    useEffect(() => {
        updateNewSectionData({ content, styles })
    }, [content, styles, updateNewSectionData])

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
            id={`content-modal-${mode}`} 
            className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >        
            <Draggable 
                onDrag={handleDrag1} 
                handle=".modal-header-1"
                defaultPosition={position1}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative rounded-lg shadow backdrop-blur-sm bg-[rgba(55,65,65,0.8)]">

                        <div className="modal-header-1 cursor-grab flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {mode === 'add' ? 'New Content' : 'Edit Content'}
                            </h3>
                            <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 md:p-5">
                            
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label htmlFor={mode} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Content
                                    </label>
                                    <input 
                                        required
                                        id={mode} 
                                        type="text" 
                                        name="content" 
                                        placeholder="Type section content" 
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)} 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                    />
                                </div>
                            </div>

                            <button type="submit" className="text-white inline-flex items-center tracking-wide bg-gradient-to-r from-slate-900 to-slate-700 hover:tracking-widest transition-all duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                {mode === 'add' ? 'Add section' : 'Edit section'}
                            </button>

                        </form>

                    </div>
                </div>

            </Draggable>

            <Draggable 
                onDrag={handleDrag2} 
                handle=".modal-header-2"
                defaultPosition={position2}
            >
                <div className="relative p-4 w-full max-w-lg max-h-full">
                    <div className="relative h-60 rounded-lg shadow backdrop-blur-sm bg-[rgba(55,65,65,0.8)]">

                        <div className="modal-header-2 cursor-grab flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {/* {mode === 'add' ? 'New Styles' : 'Edit Styles'} */}
                                Choose Styles
                            </h3>
                            <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className='h-32 overflow-y-auto'>
                            <div className='flex items-center justify-around gap-2 mt-2 ms-3 z-20'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text color
                                </p>
                                <SelectOption
                                    label={styles.color}
                                    options={['white', 'black', 'gray']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        color: selected
                                    }))}
                                />
                            </div>

                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text size
                                </p>
                                <SelectOption
                                    label={styles.fontSize}
                                    options={['16px', '18px', '20px', '22px', '26px', '30px']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        fontSize: selected
                                    }))}
                                />
                            </div>  

                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text font
                                </p>
                                <SelectOption
                                    label={styles.fontFamily}
                                    options={['sans-serif', 'monospace']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        fontFamily: selected
                                    }))}
                                />
                            </div>  

                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text weight
                                </p>
                                <SelectOption
                                    label={styles.fontWeight}
                                    options={['normal', 'semibold', 'bold']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        fontWeight: selected
                                    }))}
                                />
                            </div>  
                            
                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text align
                                </p>
                                <SelectOption
                                    label={styles.textAlign}
                                    options={['left', 'center', 'right']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        textAlign: selected
                                    }))}
                                />
                            </div>  
                            
                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text margin
                                </p>
                                <SelectOption
                                    label={styles.marginTop}
                                    options={['0.25rem', '0.5rem', '0.75rem', '1rem']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        marginTop: selected
                                    }))}
                                />
                            </div>  
                            
                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text height
                                </p>
                                <SelectOption
                                    label={styles.lineHeight}
                                    options={['0.25rem', '0.5rem', '0.75rem', '1rem']}
                                    setOption={(selected) => setStyles(prevState => ({
                                        ...prevState,
                                        lineHeight: selected
                                    }))}
                                />
                            </div>  
                        </div>

                    </div>
                </div>

            </Draggable>
        </div> 
    )
}
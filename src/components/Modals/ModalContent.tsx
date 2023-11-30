import { useAPIStore } from "../../stores/api"
import { useEscape } from "../../hooks/useCommands"
import { SelectOption } from "../Dropdowns/SelectOption"
import { useState, useEffect, type RefObject, type FormEvent } from "react"
import Draggable, { type DraggableEvent, type DraggableData } from 'react-draggable'

type Props = {
    mode: 'add' | 'edit'
    modalRef: RefObject<HTMLDivElement>
}

type Position = { x: number; y: number }

export function ModalContent({ mode, modalRef }: Props) {

    const sectionData = useAPIStore(state => state.sectionData)

    const [name, setName] = useState<string>('')
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
        //? add new section or edit existing one 
    }   

    const closeModal = () => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
        mode === 'add' ? setName('') : setName(sectionData?.content ?? '')
    }

    useEscape({
        menuRef: modalRef,
        closeMenu: () => setName('')
    })
    
    useEffect(() => {
        mode === 'add' ? setName('') : setName(sectionData?.content ?? '')
    }, [mode, setName, sectionData])

    useEffect(() => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }, [modalRef])

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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} 
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
                                    label="Select color"
                                    setOption={() => {}}
                                    options={['white', 'black', 'gray']}
                                />
                            </div>

                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text font
                                </p>
                                <SelectOption
                                    label="Select font"
                                    setOption={() => {}}
                                    options={['sans-serif', 'monospace']}
                                />
                            </div>  

                            <div className='flex items-center justify-around gap-2 mt-2 ms-3'>
                                <p className="font-semibold text-lg tracking-wider text-white">
                                    Pick a text style
                                </p>
                                <SelectOption
                                    label="Select style"
                                    setOption={() => {}}
                                    options={['normal', 'italic']}
                                />
                            </div>  
                        </div>

                    </div>
                </div>

            </Draggable>
        </div> 
    )
}
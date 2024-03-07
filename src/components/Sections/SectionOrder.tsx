import { useRef } from "react"
import { MdCancel } from "react-icons/md"
import { TbExchange } from "react-icons/tb"
import { GiConfirmed } from "react-icons/gi"
import { SectionDrag } from "./SectionDrag"
import { useSectionSequence } from "../../hooks/useSections"
import type { SectionInfo, ProcessedSection } from "../../types/sections"

type SequenceData = SectionInfo['idSequence'][]

type Props = {
    sectionData: ProcessedSection[]
    changeMode: boolean
    updateChangeMode: (newMode: 'invert' | 'off') => void
}

export function SectionOrder({ sectionData, changeMode, updateChangeMode }: Props) {

    const { isPending, editSequences } = useSectionSequence()

    const changedData = useRef<SequenceData>([])
    const updateChangedData = (newData: SequenceData) => changedData.current = newData

    const handleSequenceEdit = () => {
        if(isPending) return 
        updateChangeMode('off')
        
        if(changedData.current.length > 0) {
            editSequences(changedData.current)
            changedData.current = []
        }
    }

    return (
        <>
            {(changeMode === true) && <SectionDrag {...{sectionData, updateChangedData}}/>}

            <div className="absolute -top-12 right-4">

                {(changeMode === true) ? (
                    <div className="flex items-center justify-between w-[14.5rem]">
                        <button
                            type='button'
                            onClick={() => handleSequenceEdit()}
                            className="inline-flex items-center w-max text-sm font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            <span className="text-lg me-2">
                                <GiConfirmed/>
                            </span>
                            <span className='hidden md:inline'>
                                Confirm
                            </span>
                        </button>

                        <button 
                            type='button'
                            onClick={() => updateChangeMode('off')}
                            className="inline-flex items-center w-28 text-md font-medium rounded-md px-4 py-2 bg-red-600 hover:bg-red-700 text-white"
                        >
                            <span className="text-lg me-2">
                                <MdCancel/>
                            </span>   
                            <span className='hidden md:inline'>
                                Cancel
                            </span>
                        </button>
                    </div>
                ) : (
                    <button
                        type='button'
                        onClick={() => updateChangeMode('invert')}
                        className="inline-flex items-center justify-around w-[12.8rem] text-md font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                        <span className="text-xl me-2">
                            <TbExchange/>
                        </span>
                        <span className='hidden md:inline'>
                            Change Order
                        </span>
                    </button>
                )}

            </div>
        </>
    )
}
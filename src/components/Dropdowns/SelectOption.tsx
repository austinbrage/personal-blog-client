import { useRef, useState, useEffect } from 'react'
import { useEscapeClickOutside } from '../../hooks/useCommands'

type Props = {
    label: string
    options: string[]
    setOption: (option: string) => void
}

export function SelectOption({ label, options, setOption }: Props) {

    const selectRef = useRef<HTMLDivElement>(null)
    const optionsRef = useRef<HTMLDivElement>(null)

    const arrowUpRef = useRef<SVGSVGElement>(null)
    const arrowDownRef = useRef<SVGSVGElement>(null)

    const [content, setContent] = useState<string>('Select an item')

    const showDropdownOptions = () => {
        optionsRef.current?.classList.toggle("hidden")
        arrowUpRef.current?.classList.toggle("hidden")
        arrowDownRef.current?.classList.toggle("hidden")
    }

    const handleChange = (optionSelected: string) => {
        setOption(optionSelected)
        setContent(optionSelected)
    }

    useEffect(() => { setContent(label) }, [label])
    
    useEscapeClickOutside({
        menuRef: selectRef,
        closeMenu: () => optionsRef.current?.classList.add("hidden")
    })

    return (
        <div ref={selectRef} className="flex-none p-2">
            
            <button onClick={showDropdownOptions} type='button' className="flex flex-row justify-between w-48 px-2 py-2 text-white bg-gray-800 border-2 border-gray-500 rounded-md shadow focus:outline-none focus:border-stone-600">
                <span className="select-none">{content}</span>
                
                <svg ref={arrowDownRef} className="hidden w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <svg ref={arrowUpRef} className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>    
            </button>

            <div ref={optionsRef} className="hidden absolute h-[128px] overflow-auto w-48 py-2 mt-2 bg-gray-500 rounded-lg shadow-xl">
                {
                    options.map((elem, index) => (
                        <span
                            key={index}
                            onClick={() => handleChange(elem)}
                            className="block px-4 py-2 text-white font-semibold hover:bg-gray-100  hover:text-slate-700 cursor-pointer"
                        >
                            {elem}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}
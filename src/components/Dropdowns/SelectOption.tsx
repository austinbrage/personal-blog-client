import { useRef, useState } from 'react'

export function SelectOption() {

    const optionsRef = useRef<HTMLDivElement>(null)
    const arrowUpRef = useRef<SVGSVGElement>(null)
    const arrowDownRef = useRef<SVGSVGElement>(null)

    const [content, setContent] = useState<string>('Select an item')

    const showDropdownOptions = () => {
        optionsRef.current && optionsRef.current.classList.toggle("hidden");
        arrowUpRef.current && arrowUpRef.current.classList.toggle("hidden");
        arrowDownRef.current && arrowDownRef.current.classList.toggle("hidden");
    }
    
    return (
        <div className="flex-none p-2">
            <button onClick={showDropdownOptions} className="flex flex-row justify-between w-48 px-2 py-2 text-white bg-gray-800 border-2 border-gray-500 rounded-md shadow focus:outline-none focus:border-stone-600">
                <span className="select-none">{content}</span>

                <svg ref={arrowDownRef} id="arrow-down" className="hidden w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                <svg ref={arrowUpRef} id="arrow-up" className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" /></svg>
            </button>
            <div ref={optionsRef} id="options" className="hidden h-[128px] overflow-auto w-48 py-2 mt-2 bg-gray-500 rounded-lg shadow-xl">
                <span onClick={() => setContent('Item 1')} className="block px-4 py-2 text-white font-semibold hover:bg-gray-100  hover:text-slate-700 cursor-pointer">Item 1</span>
                <span onClick={() => setContent('Item 2')} className="block px-4 py-2 text-white font-semibold hover:bg-gray-100  hover:text-slate-700 cursor-pointer">Item 2</span>
                <span onClick={() => setContent('Item 3')} className="block px-4 py-2 text-white font-semibold hover:bg-gray-100  hover:text-slate-700 cursor-pointer">Item 3</span>
                <span onClick={() => setContent('Item 4')} className="block px-4 py-2 text-white font-semibold hover:bg-gray-100  hover:text-slate-700 cursor-pointer">Item 4</span>
                <span onClick={() => setContent('Item 5')} className="block px-4 py-2 text-white font-semibold hover:bg-gray-100  hover:text-slate-700 cursor-pointer">Item 5</span>
            </div>
        </div>
    )
}
import { useState, useEffect } from "react"
import { colorPalette1, colorPalette2, colorPalette3 } from "../../enums/color"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

type Props = {
    currentColor: string
    changeColor: (newColor: string) => void
}

export function ColorTab({ currentColor, changeColor }: Props) {

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [currentPalette, setCurrentPalette] = useState<string[][]>(colorPalette1)

    const handleGoForward = () => {
        if(currentPage === 3) return
        setCurrentPage(prevPage => prevPage + 1)
    }

    const handleGoBack = () => {
        if(currentPage === 1) return
        setCurrentPage(prevPage => prevPage - 1)
    }

    useEffect(() => {
        if(currentPage === 1) setCurrentPalette(colorPalette1)
        if(currentPage === 2) setCurrentPalette(colorPalette2)
        if(currentPage === 3) setCurrentPalette(colorPalette3)
    }, [currentPage])

    return (
        <>
            <div className="flex mt-2 ms-5 p-2 shadow-lg rounded-md h-56 overflow-y-auto border border-gray-300 bg-[rgba(255,255,255,0.85)]">
                {
                    currentPalette.slice().reverse().map((elem, index1) => (
                        <div key={index1}>
                            {
                                elem.slice().reverse().map((color, index2) => (
                                    <div 
                                        key={index2 * 10}
                                        style={{ background: color }}
                                        onClick={() => changeColor(color)}
                                        className={`
                                            ${color === currentColor ? 'border-2 border-black scale-110' : ''} 
                                            w-6 h-6 m-1 rounded-full cursor-pointer transition-all hover:scale-110
                                        `.trim()}
                                    >
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="relative flex gap-2 top-3 left-4">

                <span 
                    onClick={handleGoBack} 
                    className={`
                        ${(currentPage === 1) 
                            ? ' cursor-default hover:scale-100 bg-gray-800' 
                            : 'cursor-pointer hover:scale-110 bg-gray-700'}
                            
                        p-2 text-3xl rounded-md transition-all text-white  
                    `.trim()}
                >
                    <IoIosArrowBack/>
                </span>
                
                <span 
                    onClick={handleGoForward} 
                    className={`
                        ${(currentPage === 3) 
                            ? ' cursor-default hover:scale-100 bg-gray-800' 
                            : 'cursor-pointer hover:scale-110 bg-gray-700'}

                        p-2 text-3xl rounded-md transition-all text-white  
                    `.trim()}
                >
                    <IoIosArrowForward/>
                </span>
                
            </div>
        </>
    )
}
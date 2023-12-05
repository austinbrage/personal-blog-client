import { alignOptions } from "../../enums/align"
import { FaAlignLeft, FaAlignRight, FaAlignCenter, FaAlignJustify } from "react-icons/fa"

type Props = {
    currentAlign: string
    changeAlign: (newAlign: alignOptions) => void
}

export function AlignTab({ currentAlign, changeAlign }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr] gap-2">
            
            {
                Object.entries(alignOptions).map(([alignName, alignValue], index) => (
                    <div
                        key={index}
                        onClick={() => changeAlign(alignValue)}
                        className={`
                            ${(currentAlign === alignValue) ? 'opacity-100 scale-105' : ''}
                            flex align-center justify-around p-3 w-36 text-center opacity-70 text-lg font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        <span className="mt-[2px]">
                            { (alignValue === 'left') && <FaAlignLeft/> }
                            { (alignValue === 'right') && <FaAlignRight/> }
                            { (alignValue === 'center') && <FaAlignCenter/> }
                            { (alignValue === 'justify') && <FaAlignJustify/> }
                        </span>
                        <span>{ alignName.toUpperCase() }</span>
                    </div>
                ))
            }

        </div>
    )
}
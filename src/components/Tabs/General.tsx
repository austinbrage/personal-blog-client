import { generalOptions } from "../../enums/general"
import { type Styles } from "../../types/sections"

type Props = {
    currentStyles: Styles
    changeStyles: (newStyles: Styles) => void 
}

export function GeneralTab({ currentStyles, changeStyles }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr] gap-2">
            
            {
                generalOptions.map((option, index) => (
                    <div 
                        key={index}
                        onClick={() => changeStyles(option.value)}
                        className={`
                            ${(currentStyles.fontSize === option.value.fontSize) ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}
                            p-3 w-36 text-center text-xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {option.name}
                    </div>
                ))   
            }

        </div>
    )
}
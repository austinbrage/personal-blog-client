import { generalOptions } from "../../enums/general"
import type { Styles, ContentType } from "../../types/sections"

type CompareTypes = { 
    currentContentType: ContentType, 
    optionName: ContentType 
}

type NewData = {
    newStyles: Styles
    newContentType: ContentType
}

type Props = {
    currentContentType: ContentType
    changeStyles: (newData: NewData) => void 
}

export function GeneralTab({ currentContentType, changeStyles }: Props) {

    const handleCompareTypes = ({ currentContentType, optionName }: CompareTypes) => {
        if(currentContentType.includes('image') && optionName.includes('image')) return true
        if(currentContentType === optionName) return true
        return false
    }

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr] gap-2">
            
            {
                generalOptions.map((option, index) => (
                    <div 
                        key={index}
                        onClick={() => changeStyles({ 
                            newStyles: option.value, 
                            newContentType: option.name 
                        })}
                        className={`
                            ${
                                handleCompareTypes({ currentContentType, optionName: option.name })
                                    ? 'opacity-100 scale-105' 
                                    : 'opacity-70 scale-100'
                            }
                            p-3 w-36 text-center text-xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {option.name === 'image_url' ? 'image' : option.name}
                    </div>
                ))   
            }

        </div>
    )
}
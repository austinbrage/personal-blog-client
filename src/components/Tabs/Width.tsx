import { widthOptions } from '../../enums/width'

type Props = {
    currentWidth: string
    changeWidth: (newWidth: widthOptions) => void
}

export function WidthTab({ currentWidth, changeWidth }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr,1fr] gap-2">

            {
                Object.entries(widthOptions).map(([widthName, widthValue], index) => (
                    <div 
                        key={index}
                        onClick={() => changeWidth(widthValue)}
                        className={`
                            ${(currentWidth === widthValue) ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}
                            px-1 py-2 w-24 text-center text-xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {widthName}
                    </div>
                ))   
            }
            
        </div>
    )
}
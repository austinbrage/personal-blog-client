import { sizeOptions } from '../../enums/size'

type Props = {
    currentSize: string
    changeSize: (newSize: sizeOptions) => void
}

export function SizeTab({ currentSize, changeSize }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr] gap-2">

            {
                Object.entries(sizeOptions).map(([sizeName, sizeValue], index) => (
                    <div 
                        key={index}
                        onClick={() => changeSize(sizeValue)}
                        className={`
                            ${(currentSize === sizeValue) ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}
                            p-3 w-36 text-center text-2xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {sizeName}
                    </div>
                ))   
            }
            
        </div>
    )
}
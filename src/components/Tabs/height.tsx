import { heightOptions } from '../../enums/height'

type Props = {
    currentHeight: string
    changeHeight: (newHeight: heightOptions) => void
}

export function HeightTab({ currentHeight, changeHeight }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr,1fr] gap-2">

            {
                Object.entries(heightOptions).map(([heightName, heightValue], index) => (
                    <div 
                        key={index}
                        onClick={() => changeHeight(heightValue)}
                        className={`
                            ${(currentHeight === heightValue) ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}
                            px-1 py-2 w-24 text-center text-xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {heightName}
                    </div>
                ))   
            }
            
        </div>
    )
}
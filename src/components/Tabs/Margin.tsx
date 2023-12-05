import { marginOptions } from '../../enums/margin'

type Props = {
    currentMargin: string
    changeMargin: (newMargin: marginOptions) => void
}

export function MarginTab({ currentMargin, changeMargin }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr,1fr] gap-2">
            
            {
                Object.entries(marginOptions).map(([marginName, marginValue], index) => (
                    <div 
                        key={index}
                        onClick={() => changeMargin(marginValue)}
                        className={`
                            ${(currentMargin === marginValue) ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}
                            p-2 w-24 text-center text-xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {marginName}
                    </div>
                ))   
            }

        </div>
    )
}
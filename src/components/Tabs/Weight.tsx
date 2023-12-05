import { weightOptions } from "../../enums/weight"

type Props = {
    currentWeight: number
    changeWeight: (newWeight: weightOptions) => void  
}

export function WeightTab({ currentWeight, changeWeight }: Props) {

    return (
        <div className="absolute top-3 left-5 grid grid-cols-[1fr,1fr] gap-2">
            {
                Object.entries(weightOptions).map(([weightName, weightValue], index) => (
                    <div 
                        key={index}
                        onClick={() => changeWeight(weightValue)}
                        className={`
                            ${(currentWeight === +weightValue) ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}
                            p-3 w-36 text-center text-xl font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {weightName}
                    </div>
                ))
            }
        </div>
    )
}
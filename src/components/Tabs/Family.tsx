import { familyOptions } from '../../enums/family'

type Props = {
    currentFamily: string
    changeFamily: (newFamily: familyOptions) => void
}

export function FamilyTab({ currentFamily, changeFamily }: Props) {

    return (
        <div className="absolute top-5 left-5 grid grid-cols-[1fr,1fr,1fr] gap-2">
            
            {
                Object.entries(familyOptions).map(([marginName, sizeValue], index) => (
                    <div 
                        key={index}
                        onClick={() => changeFamily(sizeValue)}
                        className={`
                            ${(currentFamily === sizeValue) ? 'opacity-100 scale-105' : ''}
                            p-2 w-24 text-center opacity-70 text-lg font-semibold cursor-pointer rounded-md backdrop-blur-md text-white bg-[rgba(0,0,0,0.3)] transition-all hover:opacity-100 hover:scale-105
                        `.trim()}
                    >
                        {marginName}
                    </div>
                ))   
            }

        </div>
    )
}
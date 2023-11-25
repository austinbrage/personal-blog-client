import { useSectionData } from '../../hooks/useSections'

export function SectionList() {

    const { sectionData } = useSectionData()

    if(sectionData.length === 0) return (
        <article className='ms-10 text-2xl italic tracking-wider'>(No content)</article>
    )

    return (
        <article className='ms-10'>
            {sectionData.map(elem => (
                <div key={elem.id}>
                    <p style={elem.styles} className='pb-5'>{elem.content}</p>
                </div>
            ))}
        </article>
    )
}
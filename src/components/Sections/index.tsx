import { DateText } from './DateText'
import { SectionList } from './SectionList'
import { ModalDelete } from '../Modals/ModalDelete'
import { useRef } from 'react'
import { type ArticleInfo } from "../../types/articles"

type Props = {
    currentArticle: ArticleInfo['fullData'] | null
}

export function Sections({ currentArticle }: Props) {

    const modalDelete = useRef<HTMLDivElement>(null)

    const toggleModalDelete = () => {
        modalDelete.current?.classList.toggle('hidden')
        modalDelete.current?.classList.toggle('flex')
    }
    
    if(!currentArticle) return

    return (
        <section>
            <div className="text-white">

                <DateText type='Created at' date={currentArticle.created_at}/>
                <DateText type='Updated at' date={currentArticle.updated_at}/>
                
                <div className='border-2 ms-5 border-dashed bg-gray-800 border-gray-700'>
                </div>

                <h4 className="ms-5 mt-5 text-4xl font-bold">
                    {currentArticle.title}
                </h4>
                
                <p className="ms-10 my-10 text-2xl font-semibold">
                    {currentArticle.description}
                </p>
                
                <SectionList
                    toggleModalDelete={toggleModalDelete}
                />

                <ModalDelete
                    modalType='section'
                    modalRef={modalDelete}
                    toggleModal={toggleModalDelete}
                />

            </div>
        </section>
    )
}
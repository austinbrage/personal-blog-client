import { useRef } from 'react'
import { DateText } from './DateText'
import { SectionList } from './SectionList'
import { ModalDelete } from '../Modals/ModalDelete'
import { ModalContent } from '../Modals/ModalContent'
import { useEscape } from '../../hooks/useCommands'
import { type ArticleInfo } from "../../types/articles"
import { type ContentStyles } from '../../types/sections'

type Props = {
    newData: ContentStyles
    currentArticle: ArticleInfo['fullData'] | null
}

export function Sections({ newData, currentArticle }: Props) {

    const modalDelete = useRef<HTMLDivElement>(null)
    const modalContent = useRef<HTMLDivElement>(null)

    const openModalDelete = () => {
        modalDelete.current?.classList.remove('hidden')
        modalDelete.current?.classList.add('flex')
    }
    const openModalContent = () => {
        modalContent.current?.classList.remove('hidden')
        modalContent.current?.classList.add('flex')
    }

    useEscape({
        menuRef: modalContent,
        closeMenu: () => {
            modalContent.current?.classList.add('hidden')
            modalContent.current?.classList.remove('flex')   
        }
    })
    
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
                    newData={newData}
                    openModalDelete={openModalDelete}
                    openModalContent={openModalContent}
                />

                <ModalContent
                    mode='edit'
                    modalRef={modalContent}
                />

                <ModalDelete
                    mode='section'
                    modalRef={modalDelete}
                />

            </div>
        </section>
    )
}
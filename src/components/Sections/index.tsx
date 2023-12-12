import { useRef, useState } from 'react'
import { DateText } from './DateText'
import { SectionList } from './SectionList'
import { ModalDelete } from '../Modals/ModalDelete'
import { ModalEditorChange } from '../Modals/ModalEditorChange'
import { useEscape } from '../../hooks/useCommands'
import { useAPIStore } from '../../stores/api'
import { defaultOptions } from '../../enums/general'
import { type ArticleInfo } from "../../types/articles"
import { type ContentStyles } from '../../types/sections'

type Props = {
    newData: ContentStyles
    currentArticle: ArticleInfo['fullData'] | null
}

export function Sections({ newData, currentArticle }: Props) {

    const modalDelete = useRef<HTMLDivElement>(null)
    const modalEditor = useRef<HTMLDivElement>(null)

    const updateEditMode = useAPIStore(state => state.updateEditMode)

    const [editSection, setEditSection] = useState<ContentStyles>(defaultOptions)

    const openModalDelete = () => {
        modalDelete.current?.classList.remove('hidden')
        modalDelete.current?.classList.add('flex')
    }
    const openModalEditor = () => {
        updateEditMode(true)
        modalEditor.current?.classList.remove('hidden')
        modalEditor.current?.classList.add('flex')
    }

    useEscape({
        menuRef: modalEditor,
        closeMenu: () => {
            updateEditMode(false)
            modalEditor.current?.classList.add('hidden')
            modalEditor.current?.classList.remove('flex')   
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
                
                {currentArticle.image ? (
                    <div className='flex'>
                        <img 
                            src={currentArticle.image} 
                            alt={`${currentArticle.name} image post`} 
                            style={{ aspectRatio: '16/9' }}
                            className='ms-10 my-5 w-80 rounded-md'
                        />
                        <p className="ms-10 mt-5 mb-10 text-2xl font-semibold">
                            {currentArticle.description}
                        </p>
                    </div>
                ) : (
                    <p className="ms-10 mt-5 mb-10 text-2xl font-semibold">
                        {currentArticle.description}
                    </p>
                )}
                
                <SectionList
                    newData={newData}
                    editData={editSection}
                    openModalDelete={openModalDelete}
                    openModalContent={openModalEditor}
                />

                <ModalEditorChange
                    modalRef={modalEditor}
                    editData={editSection}
                    setEditData={setEditSection}
                />

                <ModalDelete
                    mode='section'
                    modalRef={modalDelete}
                />

            </div>
        </section>
    )
}
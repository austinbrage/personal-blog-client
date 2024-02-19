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

                <div className="flex flex-col items-center justify-center w-full px-10 mt-5 text-center">
                   
                    <h4 className="ms-5 mt-5 text-5xl font-bold font-dm-sans tracking-wider">
                        {currentArticle.title}
                    </h4>
                    
                    <div className='relative mt-5 w-full lg:w-5/6 rounded-md'>
                        <img 
                            src="https://th.bing.com/th/id/OIP.rXaXp7QU8INIhQWoxnZYlgHaEo?rs=1&pid=ImgDetMain" 
                            alt="Post card background image"
                            className='absolute top-0 left-0 w-full h-3/4 opacity-80' 
                        />
                        <div className='w-full backdrop-blur-md bg-[rgba(32,32,37,0.5)]'>
                            <div className='flex flex-col md:flex-row items-center'>
                                {currentArticle.image && (
                                    <img 
                                        src={currentArticle.image} 
                                        alt={`${currentArticle.name} image post`} 
                                        style={{ aspectRatio: '16/9' }}
                                        className='ms-10 my-5 w-80 rounded-md'
                                    />
                                )}
                                <p className="ms-10 mt-5 mb-10 line-clamp-6 font-dm-sans font-semibold text-xl text-start text-[rgb(229,231,235)]">
                                    {currentArticle.description}
                                </p>
                            </div>
                            <div className='flex gap-5 items-center justify-end me-4 mb-4'>
                                {currentArticle.keywords.split(',').map(elem => (
                                    <span key={elem} className='py-2 px-3 rounded-lg font-dm-sans  text-md tracking-wide bg-gradient-to-r from-stone-700 to-stone-900'>
                                        {elem}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
 
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
import { useRef, useState, useContext } from 'react'
import { ModeContext } from '../../context/modes'
import { DateText } from './DateText'
import { SectionList } from './SectionList'
import { ModalDelete } from '../Modals/ModalDelete'
import { ModalEditorChange } from '../Modals/ModalEditorChange'
import { useEscape } from '../../hooks/useCommands'
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

    const { updateEditMode } = useContext(ModeContext)

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
                   
                    <h4 className="ms-5 mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-dm-sans tracking-wider">
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
                                        className='ms-10 my-5 w-56 sm:w-80 rounded-md'
                                    />
                                )}
                                <p className="ms-10 mt-5 mb-10 line-clamp-6 font-dm-sans font-semibold text-lg md:text-xl text-start text-[rgb(229,231,235)]">
                                    {currentArticle.description}
                                </p>
                            </div>
                            <div className='flex flex-wrap gap-5 items-center justify-start md:justify-end ms-4 me-0 md:ms-0 md:me-4 mb-4'>
                                {currentArticle.keywords.split(',').map(elem => (
                                    <span key={elem} className='flex px-4 py-2 border rounded-lg font-dm-sans text-sm md:text-md tracking-wide text-gray-200 bg-gray-800 border-gray-700'>
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
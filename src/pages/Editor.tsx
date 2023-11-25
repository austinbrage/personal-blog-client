import { useParams } from "react-router-dom"
import { useRef, forwardRef } from "react"
import { useArticleData } from '../hooks/useArticles'
import { MenuTable } from "../components/MenuTable"
import { ButtonAdd } from "../components/ButtonAdd"
import { MenuRadial } from "../components/MenuRadial"
import { ModalEdit } from "../components/Modals/ModalEdit"
import { ModalDelete } from "../components/Modals/ModalDelete"
import { KeyboardInfo } from "../components/KeyBoard"
import { useModalEditCommands } from '../hooks/useCommands'

export const EditorPage = forwardRef(() => {
    
    const { editor, article } = useParams()

    const { articleData } = useArticleData({ shouldFetch: true })
    const articleList = articleData.map(elem => elem.name)
    
    const modalEdit = useRef<HTMLDivElement>(null)
    const modalInfo = useRef<HTMLDivElement>(null)
    const modalDelete = useRef<HTMLDivElement>(null)

    const toggleModalInfo = () => {
        modalInfo.current && modalInfo.current.classList.toggle('hidden')
    }
    
    const toggleModalDelete = () => {
        modalDelete.current && modalDelete.current.classList.toggle('hidden')
        modalDelete.current && modalDelete.current.classList.toggle('flex')
    }
    
    const toggleModalEdit = () => {
        modalEdit.current && modalEdit.current.classList.toggle('hidden')
        modalEdit.current && modalEdit.current.classList.toggle('flex')
    }
    const closeModalEdit = () => {
        modalEdit.current && modalEdit.current.classList.add('hidden')
        modalEdit.current && modalEdit.current.classList.remove('flex')
    }
    const openModalEdit = () => {
        modalEdit.current && modalEdit.current.classList.remove('hidden')
        modalEdit.current && modalEdit.current.classList.add('flex')
    }

    useModalEditCommands({ 
        menuRef: modalEdit, 
        openMenu: openModalEdit, 
        closeMenu: closeModalEdit 
    })

    return (
        <div className="p-8 min-h-screen bg-[rgb(15,15,24)]">
            
            <h3 className="text-5xl text-left font-semibold leading-tight mb-4 text-white">
                {editor === 'edit' ? article?.replace(/-/g, " ") : 'Create article'}
            </h3>
            
            {/* //! Visible components */}
            <ButtonAdd 
                toggleModal={toggleModalEdit}
            />
            <MenuTable 
                toggleModal={toggleModalInfo}
                postsList={articleList} 
            />
            <MenuRadial
                toggleModalEdit={toggleModalEdit}  
                toggleModalDelete={toggleModalDelete}
            />

            {/* //! Hidden components */}
            <KeyboardInfo 
                modalRef={modalInfo} 
                toggleModal={toggleModalInfo} 
            />
            <ModalEdit
                mode="add"
                modalRef={modalEdit} 
                toggleModal={toggleModalEdit}
            />
            <ModalDelete 
                modalType="article"
                modalRef={modalDelete} 
                toggleModal={toggleModalDelete} 
            />

        </div>
    )
})
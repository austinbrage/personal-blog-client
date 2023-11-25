import { useParams } from "react-router-dom"
import { Sections } from "../components/Sections"
import { MenuTable } from "../components/MenuTable"
import { ButtonAdd } from "../components/ButtonAdd"
import { MenuRadial } from "../components/MenuRadial"
import { ModalEdit } from "../components/Modals/ModalEdit"
import { ModalDelete } from "../components/Modals/ModalDelete"
import { KeyboardInfo } from "../components/KeyBoard"
import { useArticleData } from '../hooks/useArticles'
import { useModalEditCommands } from '../hooks/useCommands'
import { useRef, forwardRef, useMemo } from "react"
import { useAPIStore } from "../stores/api"

export const EditorPage = forwardRef(() => {
    
    const { editor, article } = useParams()
    const updateArticleID = useAPIStore(state => state.updateArticleId)

    const { articleData } = useArticleData({ shouldFetch: true })
    const articleList = articleData.map(elem => elem.name)

    const currentArticle = useMemo(() => {
        const current = articleData
            .find(elem => elem.name === article?.replace(/-/g, " ")) 

        current && updateArticleID(current.id.toString())
        return current ?? null
    }, [updateArticleID, articleData, article])
    
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
            <Sections
                currentArticle={currentArticle}
            />
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
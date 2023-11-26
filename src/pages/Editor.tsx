import { useParams } from "react-router-dom"
import { Sections } from "../components/Sections"
import { MenuTable } from "../components/MenuTable"
import { ButtonAdd } from "../components/ButtonAdd"
import { MenuRadial } from "../components/MenuRadial"
import { ModalAdd } from "../components/Modals/ModalAdd"
import { ModalEdit } from "../components/Modals/ModalEdit"
import { ModalDelete } from "../components/Modals/ModalDelete"
import { KeyboardInfo } from "../components/KeyBoard"
import { useArticleData } from '../hooks/useArticles'
import { useModalEditCommands } from '../hooks/useCommands'
import { useRef, useState, forwardRef, useMemo } from "react"
import { useAPIStore } from "../stores/api"

export const EditorPage = forwardRef(() => {
    
    
    const { editor, article } = useParams()
    const updateArticleID = useAPIStore(state => state.updateArticleId)
    const updateArticleData = useAPIStore(state => state.updateArticleData)
    
    const { articleData } = useArticleData()
    const articleList = articleData.map(elem => elem.name)
    
    const [isToggle, setIsToggle] = useState<boolean>(false)

    const currentArticle = useMemo(() => {
        const current = articleData
            .find(elem => elem.name === article?.replace(/-/g, " ")) 

        current && updateArticleID(current.id.toString())
        current && updateArticleData(current)

        return current ?? null
    }, [updateArticleData, updateArticleID, articleData, article])
    
    const modalAdd = useRef<HTMLDivElement>(null)
    const modalEdit = useRef<HTMLDivElement>(null)
    const modalInfo = useRef<HTMLDivElement>(null)
    const modalDelete = useRef<HTMLDivElement>(null)

    const toggleModalInfo = () => {
        modalInfo.current?.classList.toggle('hidden')
    }
    
    const toggleModalDelete = () => {
        modalDelete.current?.classList.toggle('hidden')
        modalDelete.current?.classList.toggle('flex')
    }
    
    const toggleModalAdd = () => {
        modalAdd.current?.classList.toggle('flex')
        modalAdd.current?.classList.toggle('hidden')
    }
    const toggleModalEdit = () => {
        setIsToggle(prevState => !prevState)
        modalEdit.current?.classList.toggle('hidden')
        modalEdit.current?.classList.toggle('flex')
    }
    
    const openModalAdd = () => {
        modalAdd.current?.classList.remove('hidden')
        modalAdd.current?.classList.add('flex')
    }
    const closeModalAdd = () => {
        modalAdd.current?.classList.add('hidden')
        modalAdd.current?.classList.remove('flex')
        modalEdit.current?.classList.add('hidden')
        modalEdit.current?.classList.remove('flex')
    }

    useModalEditCommands({ 
        menuRef: modalAdd, 
        openMenu: openModalAdd, 
        closeMenu: closeModalAdd 
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
                toggleModal={openModalAdd}
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
            <ModalAdd
                modalRef={modalAdd} 
                toggleModal={toggleModalAdd}
            />
            <ModalEdit
                isToggle={isToggle}
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
import { useParams } from "react-router-dom"
import { Sections } from "../components/Sections"
import { MenuTable } from "../components/MenuTable"
import { ButtonAdd } from "../components/ButtonAdd"
import { MenuRadial } from "../components/MenuRadial"
import { ModalAdd } from "../components/Modals/ModalAdd"
import { ModalEdit } from "../components/Modals/ModalEdit" 
import { ModalDelete } from "../components/Modals/ModalDelete"
import { ModalContent } from "../components/Modals/ModalContent" 
import { PublishLabel } from "../components/Sections/PublishLabel"
import { KeyboardInfo } from "../components/KeyBoard"
import { useArticleData } from '../hooks/useArticles'
import { useRef, useState, forwardRef, useMemo } from "react"
import { useAPIStore } from "../stores/api"

export const EditorPage = forwardRef(() => {
    
    const { editor, article } = useParams()
    const { articleData } = useArticleData()

    const updateArticleID = useAPIStore(state => state.updateArticleId)
    const updateArticleData = useAPIStore(state => state.updateArticleData)
    
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
    const modalContent = useRef<HTMLDivElement>(null)

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

    return (
        <div className="p-8 min-h-screen bg-[rgb(15,15,24)]">
            
            <h3 className="inline-block text-5xl text-left font-semibold leading-tight mb-2 text-white">
                {editor === 'edit' ? article?.replace(/-/g, " ") : 'Create article'}
            </h3>
            
            {/* //! Visible components */}
            <PublishLabel
                isPublish={currentArticle?.is_publish}
            />
            <Sections
                currentArticle={currentArticle}
            />
            <ButtonAdd 
                modalAdd={modalAdd}
                modalContent={modalContent}
                editorMode={editor ?? 'create'}
            />
            <MenuTable 
                postsList={articleList} 
                toggleModal={toggleModalInfo}
            />
            <MenuRadial
                isPublish={currentArticle?.is_publish}
                toggleModalEdit={toggleModalEdit}  
                toggleModalDelete={toggleModalDelete}
            />

            {/* //! Hidden components for articles */}
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
                mode="article"
                modalRef={modalDelete}  
            />

            {/* //! Hidden components for sections */}
            <ModalContent
                mode="add"
                modalRef={modalContent}
            />

        </div>
    )
})
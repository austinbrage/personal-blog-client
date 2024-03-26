import { useRef, useState, useEffect, useContext, type FormEvent, type RefObject } from "react"
import { useArticleEdit, useArticleKeywords } from "../../hooks/useArticles"
import { useUploadSections, useUploadArticle } from "../../hooks/useUpload"
import { ArticleContext } from "../../context/articles"
import { useEscape } from "../../hooks/useCommands"
import { useDownload } from "../../hooks/useDownload"
import { FaUpload, FaDownload } from "react-icons/fa"
import { IoIosArrowDown } from "react-icons/io"
import { TiTick } from "react-icons/ti"

type Props = {
    isToggle: boolean
    modalRef: RefObject<HTMLDivElement> 
    toggleModal: () => void
}

export function ModalEdit({ isToggle, modalRef, toggleModal }: Props) {
    
    const formRef = useRef<HTMLFormElement>(null)    
    const sectionFileRef = useRef<HTMLInputElement>(null)    
    const articleFileRef = useRef<HTMLInputElement>(null)    
    
    const closeModal = () => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }

    const cleanModal = () => {
        formRef.current?.reset()
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }

    const dowloadSections = useDownload()

    const { availableKeywords } = useArticleKeywords()
    const { handleSectionChange } = useUploadSections({ closeModal })
    const { editArticle, isPending } = useArticleEdit({ cleanModal })
    const { file, editArticleFile, handleArticleChange } = useUploadArticle({ cleanModal })

    const { articleData } = useContext(ArticleContext)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [imageMode, setImageMode] = useState<'url' | 'file'>('url')

    const [name, setName] = useState<string>(articleData?.name ?? '')
    const [title, setTitle] = useState<string>(articleData?.title ?? '')
    const [image, setImage] = useState<string>(articleData?.image ?? '')
    const [keywords, setKeywords] = useState<string>(articleData?.keywords ?? '')
    const [description, setDescription] = useState<string>(articleData?.description ?? '')

    const uploadSections = () => {
        if(!sectionFileRef.current) return
        sectionFileRef.current.click()
    }

    const uploadPostFile = () => {
        if(!articleFileRef.current) return
        articleFileRef.current.click()
    }
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isPending) return

        file
            ? editArticleFile({ name, title, keywords, description })
            : editArticle({ name, image, title, keywords, description })
    }

    const handleKeywords = (selectedWord: string) => {
        let arrayKeywords = keywords.split(', ')

        arrayKeywords.includes(selectedWord)
            ? arrayKeywords = arrayKeywords.filter(word => word != selectedWord)
            : arrayKeywords.push(selectedWord)

        setKeywords(arrayKeywords.join(', '))
    }

    useEffect(() => {
        setName(articleData?.name ?? '')
        setTitle(articleData?.title ?? '')
        setImage(articleData?.image ?? '')
        setKeywords(articleData?.keywords ?? '')
        setDescription(articleData?.description ?? '')
    }, [articleData, isToggle])

    useEscape({
        menuRef: modalRef,
        closeMenu: closeModal
    })

    return (
        <div ref={modalRef} id="crud-modal-2" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            
            <div className="relative p-4 w-full max-w-lg max-h-full">
                <div className="relative rounded-lg shadow backdrop-blur-sm bg-[rgba(55,65,81,0.85)]">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Edit article info
                        </h3>
                        <button onClick={toggleModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="p-4 md:p-5">
                        
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-1">
                                <label htmlFor="name2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    NickName
                                </label>
                                <input 
                                    required
                                    id="name2" 
                                    type="text" 
                                    name="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} 
                                    placeholder="Type articles alias name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="title2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Title
                                </label>
                                <input 
                                    required
                                    id="title2" 
                                    type="text" 
                                    name="title" 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)} 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type articles complete title" 
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="keywords2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Keywords
                                </label>
                                <div 
                                    onClick={() => setIsOpen(prev => !prev)}
                                    className="flex items-center justify-between p-2.5 rounded-lg bg-gray-600 border-gray-500 cursor-pointer"
                                >
                                    <p className="whitespace-nowrap overflow-hidden text-ellipsis text-white">
                                        {keywords}
                                    </p>
                                    <span className={`text-lg transition-all ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                                        <IoIosArrowDown/>
                                    </span>
                                </div>
                                <div className="relative mt-1">
                                    {isOpen && (
                                        <div className="absolute w-full h-32 overflow-y-auto">
                                            {availableKeywords?.map(data => (
                                                <div 
                                                    key={data.id} 
                                                    onClick={() => handleKeywords(data.keyword)}
                                                    className={`
                                                        ${keywords.includes(data.keyword) ? 'bg-[rgb(198,192,192)]' : 'bg-[rgb(147,143,143)]'}
                                                        flex justify-between text-md italic font-semibold p-2 rounded-md border-b-2 border-slate-900 color-black cursor-pointer
                                                    `}
                                                >
                                                    <p>
                                                        {data.keyword}
                                                    </p>
                                                    {keywords.includes(data.keyword) && (
                                                        <span className="text-md">
                                                            <TiTick/>
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label 
                                    htmlFor="image2" 
                                    onClick={() => setImageMode('url')}
                                    className={`
                                        ${imageMode === 'url' ? 'opacity-100' : 'opacity-50'} 
                                        block mb-2 text-sm font-medium text-white cursor-pointer
                                    `.trim()}
                                >
                                    Image URL
                                </label>
                                <label 
                                    htmlFor="imageFile" 
                                    onClick={() => setImageMode('file')}
                                    className={`
                                        ${imageMode === 'file' ? 'opacity-100' : 'opacity-50'} 
                                        absolute top-[11.2rem] right-10 block mb-2 text-sm font-medium text-white cursor-pointer
                                    `.trim()}
                                >
                                    Image File
                                </label>
                                <input 
                                    // required
                                    id="image2" 
                                    type="text" 
                                    name="image" 
                                    value={image ? image : ''}
                                    onChange={(e) => setImage(e.target.value)} 
                                    placeholder="Type articles complete title" 
                                    className={`
                                        ${imageMode === 'url' ? 'block' : 'hidden'}               
                                        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500
                                    `.trim()}
                                />
                                <input 
                                    type="file" 
                                    id="articleFile"  
                                    ref={articleFileRef}
                                    className="hidden"
                                    onChange={(e) => handleArticleChange(e)} 
                                />
                                <button
                                    type='button'
                                    onClick={() => uploadPostFile()}
                                    className={`
                                        ${imageMode === 'file' ? 'block' : 'hidden'} 
                                        inline-flex items-center justify-center w-full text-sm font-medium rounded-md px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800
                                    `.trim()}
                                >
                                    <span className="text-lg me-2">
                                        <FaUpload/>
                                    </span>
                                    Choose file
                                </button>  
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="description2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Article Description
                                </label>
                                <textarea 
                                    required
                                    rows={4} 
                                    id="description2" 
                                    name="description" 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} 
                                    className="block p-2.5 w-full text-md font-semibold text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write article description here"
                                >
                                </textarea>                    
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Edit article
                            </button>

                            <div className="flex items-center gap-4">
                                
                                <input 
                                    type="file" 
                                    id="sectionFile" 
                                    ref={sectionFileRef}
                                    className="hidden"
                                    onChange={(e) => handleSectionChange(e)} 
                                />
                                
                                <button
                                    type='button'
                                    onClick={() => uploadSections()}
                                    className="inline-flex items-center w-max text-sm font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                                >
                                    <span className="text-lg me-2">
                                        <FaUpload/>
                                    </span>
                                    Import
                                </button>                       

                                <button
                                    type='button'
                                    onClick={() => dowloadSections()}
                                    className="inline-flex items-center w-max text-sm font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                                >
                                    <span className="text-lg me-2">
                                        <FaDownload/>
                                    </span>
                                    Export
                                </button>                       
                            </div>                             

                        </div>

                    </form>

                </div>
            </div>

        </div> 
    )
}
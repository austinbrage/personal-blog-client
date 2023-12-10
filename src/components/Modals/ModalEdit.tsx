import { useRef, useState, useEffect, type FormEvent, type RefObject } from "react"
import { useArticleEdit } from "../../hooks/useArticles"
import { useAPIStore } from "../../stores/api"
import { useEscape } from "../../hooks/useCommands"

type Props = {
    isToggle: boolean
    modalRef: RefObject<HTMLDivElement> 
    toggleModal: () => void
}

export function ModalEdit({ isToggle, modalRef, toggleModal }: Props) {
    
    const formRef = useRef<HTMLFormElement>(null)    
    
    const { editArticle, isPending } = useArticleEdit({ cleanModal: () => {
        formRef.current?.reset()
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    } })

    const articleData = useAPIStore(state => state.articleData)

    const [name, setName] = useState<string>(articleData?.name ?? '')
    const [title, setTitle] = useState<string>(articleData?.title ?? '')
    const [description, setDescription] = useState<string>(articleData?.description ?? '')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        if(isPending) return

        const data = new FormData(event.currentTarget) 
        const getStringValue = (key: string) => data.get(key)?.toString() ?? ''

        const newArticleData = {
            name: getStringValue('name'),
            title: getStringValue('title'),
            keywords: 'keywords',
            description: getStringValue('description')
        }   

        editArticle(newArticleData)
    }

    useEffect(() => {
        setName(articleData?.name ?? '')
        setTitle(articleData?.title ?? '')
        setDescription(articleData?.description ?? '')
    }, [articleData, isToggle])

    useEscape({
        menuRef: modalRef,
        closeMenu: () => {
            modalRef.current?.classList.add('hidden')
            modalRef.current?.classList.remove('flex')
        }
    })

    return (
        <div ref={modalRef} id="crud-modal-2" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            
            <div className="relative p-4 w-full max-w-md max-h-full">
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
                            <div className="col-span-2">
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

                            <div className="col-span-2">
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

                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Edit article
                        </button>

                    </form>

                </div>
            </div>

        </div> 
    )
}
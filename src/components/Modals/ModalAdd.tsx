import { useRef, useState, type FormEvent, type RefObject } from "react"
import { useArticleAdd } from "../../hooks/useArticles"
import { useSectionAddTemplate } from "../../hooks/useSections"
import { TemplateOptions } from "../../types/sections"

type Props = {
    modalRef: RefObject<HTMLDivElement> 
}

export function ModalAdd({ modalRef }: Props) {
    
    const formRef = useRef<HTMLFormElement>(null)
    const [option, setOption] = useState<TemplateOptions>(TemplateOptions.none)

    const closeModal = () => {
        modalRef.current?.classList.add('hidden')
        modalRef.current?.classList.remove('flex')
    }

    const cleanModal = () => {
        closeModal()
        formRef.current?.reset()
    }

    const { addTemplateSections } = useSectionAddTemplate()

    const addTemplate = (newArticleId: number) => {
        if(option === TemplateOptions.none) return
        addTemplateSections({ newArticleId, option })
    }

    const { addNewArticle, isPending } = useArticleAdd({ 
        cleanModal, 
        addTemplate
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        if(isPending) return

        const data = new FormData(event.currentTarget) 
        const getStringValue = (key: string) => data.get(key)?.toString() ?? ''

        const newArticleData = {
            name: getStringValue('name'),
            title: 'Place an article general title here',
            keywords: 'General, Tech',
            image: 'https://th.bing.com/th/id/R.f86b00c053d1ec4f336e126c2ca83b95?rik=F8wAroy8bD3rQg&riu=http%3a%2f%2frlv.zcache.com%2ftemplate_blank_add_your_image_text_here_sticker-r64216cd6594f4f23bdad64fee876a3a1_v9waf_8byvr_1200.jpg%3fview_padding%3d%5b0.452380952380952%2c0%2c0.452380952380952%2c0%5d&ehk=%2fu9KDxCwHRqvNRbBmqLTQ7Fl5CaKNMFOXBgs6EpN%2bZg%3d&risl=&pid=ImgRaw&r=0',
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi libero, nulla odit quam aliquam sed sequi maxime, consequatur, esse similique qui in. A, commodi. Beatae eum doloremque, illo saepe dicta eveniet excepturi ex ipsa nemo corporis vitae, iusto sed? Nemo inventore id ratione fuga facilis enim est reiciendis necessitatibus dolore.'  
        }   

        addNewArticle(newArticleData)
    }

    return (
        <div ref={modalRef} id="crud-modal" tabIndex={-1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative rounded-lg shadow backdrop-blur-sm bg-[rgba(55,65,81,0.5)]">

                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Create new article
                        </h3>
                        <button onClick={closeModal} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="p-4 md:p-5">
                        
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="name1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    NickName
                                </label>
                                <input 
                                    required
                                    id="name1" 
                                    type="text" 
                                    name="name" 
                                    placeholder="Type articles alias name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                                />
                            </div>
                            <div className="col-span-2">
                                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Template
                                </p>
                                <div className='items-center w-full text-sm font-medium rounded-lg sm:flex'>
                                    {Object.values(TemplateOptions).map(elem => (
                                        <div className='w-full border-b sm:border-b-0 sm:border-r border-gray-600 cursor-pointer'>
                                            <div 
                                                className={`
                                                    relative flex items-center ps-3 transition-all duration-500
                                                    ${elem === option 
                                                        ? 'text-gray-200 bg-gray-600 scale-105 z-50' 
                                                        : 'text-gray-300 bg-gray-700 scale-100 z-0' 
                                                    }
                                                `.trim()}
                                            >
                                                <p
                                                    onClick={() => setOption(elem)}
                                                    className='w-full py-3 ps-2 text-sm font-medium'
                                                >
                                                    {elem}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Add new article
                        </button>

                    </form>

                </div>
            </div>

        </div> 
    )
}
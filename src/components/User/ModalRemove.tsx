import { useState, type RefObject } from "react"
import { useModalEditCommands } from "../../hooks/useCommands"
import { useUserDelete } from "../../hooks/useUser"

type Props = {
    modalRef: RefObject<HTMLDivElement> 
    toggleModal: () => void
}

export function ModalRemove({ modalRef, toggleModal }: Props) {
    
    const [isShowText, setIsShowText] = useState<boolean>(false)
    const { isPending, deleteUser } = useUserDelete()

    const handleDelete = () => {
        if(!isShowText) return setIsShowText(true)

        if(isPending) return
        deleteUser()     
        
        toggleModal()   
        setIsShowText(false)
    }

    useModalEditCommands({
        menuRef: modalRef,
        openMenu: () => {},
        closeMenu: () => {
            modalRef.current?.classList.add('hidden')
            modalRef.current?.classList.remove('flex')
        }
    })

    return (
        <div id="popup-modal-2" tabIndex={-1} ref={modalRef} className="hidden transition-all overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                    <button onClick={toggleModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="p-4 md:p-5 text-center">
                        <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete your account?
                        </h3>
                        
                        {isShowText && (
                            <h4 className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
                                Are you sure that you are sure? 
                                <p className="italic">
                                    We will miss you!
                                </p>
                            </h4>
                        )}

                        <button onClick={() => handleDelete()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                            Yes, I'm sure
                        </button>
                        
                        <button onClick={toggleModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            No, cancel
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}
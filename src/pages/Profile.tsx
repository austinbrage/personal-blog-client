import { MdLogout } from "react-icons/md"
import { useUserData } from "../hooks/useUser"
import { useAPIStore } from "../stores/api"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { FaUserEdit } from "react-icons/fa"
import { ModalName } from '../components/User/ModalName'
import { ModalEmail } from '../components/User/ModalEmail'
import { ModalAuthor } from '../components/User/ModalAuthor'
import { useRef, useState, forwardRef } from 'react'

export const ProfilePage = forwardRef(() => {
    
    const navigate = useNavigate()
    const { userData } = useUserData()
    
    const queryClient = useQueryClient()
    const updateUserToken = useAPIStore(state => state.updateUserToken)
    
    const handleLogout = () => {
        navigate('/')
        updateUserToken('')
        queryClient.invalidateQueries({ queryKey: ['user', 'data'] })
        queryClient.invalidateQueries({ queryKey: ['article', 'data'] })
        queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
    }

    const modalName = useRef<HTMLDivElement>(null)
    const modalEmail = useRef<HTMLDivElement>(null)
    const modalAuthor = useRef<HTMLDivElement>(null)
    const [isToggle, setIsToggle] = useState<boolean>(false)

    const toggleModalName = () => {
        setIsToggle(prevState => !prevState)
        modalName.current?.classList.toggle('hidden')
        modalName.current?.classList.toggle('flex')
    }
    const toggleModalEmail = () => {
        setIsToggle(prevState => !prevState)
        modalEmail.current?.classList.toggle('hidden')
        modalEmail.current?.classList.toggle('flex')
    }
    const toggleModalAuthor = () => {
        setIsToggle(prevState => !prevState)
        modalAuthor.current?.classList.toggle('hidden')
        modalAuthor.current?.classList.toggle('flex')
    }

    return (
        <div className="p-8 min-h-screen text-white bg-[rgb(15,15,24)]">

            <ModalName
                isToggle={isToggle}
                modalRef={modalName}
                toggleModal={toggleModalName}
                currentName={userData?.name ?? ''}
            />

            <ModalEmail
                isToggle={isToggle}
                modalRef={modalEmail}
                toggleModal={toggleModalEmail}
                currentEmail={userData?.email ?? ''}
            />
            
            <ModalAuthor
                isToggle={isToggle}
                modalRef={modalAuthor}
                toggleModal={toggleModalAuthor}
                currentAuthor={userData?.author ?? ''}
            />

            <div className="px-4 py-5 sm:px-6">
                <div className="flex gap-32">
                    <h3 className="inline-block text-4xl font-bold leading-6">
                        User Profile
                    </h3>
                    <span 
                        data-text="Log Out" 
                        data-pos="bottom align-left"
                        onClick={() => handleLogout()}
                        className="text-2xl relative top-1 cursor-pointer hover:scale-150 transition-all duration-150"
                    >
                        <MdLogout/>
                    </span>
                </div>
                <p className="mt-1 max-w-2xl text-xl italic text-gray-500">
                    This is some information about the user
                </p>
            </div>

            <div className="ms-6 border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className=" sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className="text-md font-bold text-gray-500">
                            User name
                        </dt>
                        <dd className="mt-1 text-xl font-semibold sm:mt-0 sm:col-span-2">
                            {userData?.name}
                        </dd>
                        <button 
                            onClick={toggleModalName}
                            className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            <span className="text-xl me-2">
                                <FaUserEdit/>
                            </span>
                            Modify user
                        </button>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className="text-md font-bold text-gray-500">
                            Author name
                        </dt>
                        <dd className="mt-1 text-xl font-semibold sm:mt-0 sm:col-span-2">
                            {userData?.author}
                        </dd>
                        <button 
                            onClick={toggleModalAuthor}
                            className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            <span className="text-xl me-2">
                                <FaUserEdit/>
                            </span>
                            Modify author
                        </button>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className="text-md font-bold text-gray-500">
                            Password
                        </dt>
                        <dd className="mt-1 text-xl font-semibold sm:mt-0 sm:col-span-2">
                            -
                        </dd>
                        <button className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800">
                            <span className="text-xl me-2">
                                <FaUserEdit/>
                            </span>
                            Modify password
                        </button>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className="text-md font-bold text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-xl font-semibold sm:mt-0 sm:col-span-2">
                            {userData?.email}
                        </dd>
                        <button
                            onClick={toggleModalEmail}
                            className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                        >
                            <span className="text-xl me-2">
                                <FaUserEdit/>
                            </span>
                            Modify address
                        </button>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-4 sm:gap-4 sm:px-6">
                        <dt className="text-md font-bold text-gray-500">
                            API_KEY
                        </dt>
                        <dd className="mt-1 text-xl font-semibold sm:mt-0 sm:col-span-2">
                            {userData?.api_key}
                        </dd>
                        <button className="inline-flex items-center w-max text-md font-medium rounded-md px-4 py-2 bg-red-600 hover:bg-red-700 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 me-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete account
                        </button>
                    </div>
                </dl>
            </div>

            <button 
                onClick={() => navigate(-1)} 
                className="inline-flex items-center ms-6 mt-2 px-4 py-2  text-md font-bold rounded-md bg-indigo-600 hover:bg-indigo-700 text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Go back to dashboard
            </button>

        </div>
    )
})
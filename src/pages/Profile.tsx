import { MdLogout } from "react-icons/md"
import { useUserData } from "../hooks/useUser"
import { useAPIStore } from "../stores/api"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export function ProfilePage() {

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

    return (
        <div className="p-8 min-h-screen text-white bg-[rgb(15,15,24)]">

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
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            User name
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            {userData?.name}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            Author name
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            {userData?.author}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            Password
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            -
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            {userData?.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            API_KEY
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            {userData?.api_key}
                        </dd>
                    </div>
                </dl>
            </div>

            <button 
                onClick={() => navigate(-1)} 
                className="inline-flex items-center ms-6 mt-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-md font-semibold rounded-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                Go back to dashboard
            </button>

        </div>
    )
} 
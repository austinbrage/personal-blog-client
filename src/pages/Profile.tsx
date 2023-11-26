import { useNavigate } from "react-router-dom"

export function ProfilePage() {

    const navigate = useNavigate()

    return (
        <div className="p-8 min-h-screen text-white bg-[rgb(15,15,24)]">

            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-3xl font-bold leading-6">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-md italic text-gray-500">
                    This is some information about the user.
                </p>
            </div>

            <div className="ms-6 border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className=" sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            User name
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            John_1
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            Author name
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            John Doe
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            Password
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            Doe1234
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            johndoe@example.com
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md font-medium text-gray-500">
                            API_KEY
                        </dt>
                        <dd className="mt-1 text-md sm:mt-0 sm:col-span-2">
                            TOTm58=WnfrCuwK*XOuT3E24jDYTbn+izo+Wno*.l::/&2xpE?Y.N3auV8R
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
import { useNavigate } from "react-router-dom"
import { BiSolidRightArrow } from "react-icons/bi"

export function NotFoundPage() {

    const navigate = useNavigate()
    
    return (
        <section className="h-screen w-full p-10 bg-[#161616]">
            <h1 className="text-6xl font-bold font-dm-sans text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                Not Found Page
            </h1>
            <p className="font-dm-sans text-2xl text-white">
                The page you are looking for might have been 
                <span className="font-bold ms-2 italic border-dotted border-b-2 border-gray-200 text-gray-200">
                    removed
                </span>
                , had its name 
                <span className="font-bold mx-2 italic border-dotted border-b-2 border-gray-200 text-gray-200">
                    changed 
                </span>
                or is temporarily 
                <span className="font-bold ms-2 italic border-dotted border-b-2 border-gray-200 text-gray-200">
                    unavailable
                </span>
                .
            </p>
            <p className="flex items-center ms-10 mt-10 font-dm-sans text-xl scale-105 text-white">
                <span className="me-4 text-sm">
                    <BiSolidRightArrow/>
                </span>
                Please try to 
                <span
                    onClick={() => navigate(-1)}
                    className="mx-3 italic px-3 py-1 rounded-2xl font-semibold text-black bg-white cursor-pointer scale-100 transition-all duration-[400] hover:scale-110 hover:transition-all"
                >
                    go back
                </span>
                or
                <span
                    className="mx-3 italic px-3 py-1 rounded-2xl font-semibold text-black bg-white cursor-pointer scale-100 transition-all duration-[400] hover:scale-105 hover:transition-all"
                    onClick={() => navigate('/')}
                >
                    return to homepage
                </span>
            </p>
        </section>
    )
}
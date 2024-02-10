import { useContext } from "react"
import { LayoutContext } from "./Layout"

export function HomePage() {

    const { isSignUp, toggleSignUp } = useContext(LayoutContext)

    return (
        <div 
            style={{ backgroundImage: "url(https://th.bing.com/th/id/OIP.I96jXmN6P6pK4w26Q9YMcQHaEK?pid=ImgDet&rs=1)" }}
            className="flex w-[50vw] h-full relative items-center bg-cover bg-no-repeat bg-gray-500"
        >
            <div className="absolute top-0 left-0 w-[50vw] h-screen backdrop-blur-sm bg-[rgba(107,114,128,0.1)]"></div>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            
            <div className="w-full px-24 z-10 relative shadow-lg">
                <h1 className="text-5xl font-extrabold text-left tracking-wide">
                    Keep it special
                </h1>
                <p className="text-3xl my-4">
                    Capture your personal memory and knowledge, in a unique way.
                </p>
                <div className="pb-2 pt-4 w-2/4"> 
                    <button 
                        type="button" 
                        onClick={() => toggleSignUp()} 
                        className="text-slate-800 uppercase block tracking-widest font-extrabold w-2/4 p-4 text-lg rounded-full bg-gradient-to-r from-violet-200 to-pink-200 absolute -bottom-32 left-32"
                    >
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    )
}
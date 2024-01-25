import { useState } from "react"
import { FormBody } from "../components/Login/FormBody"
import { MagicMotion } from 'react-magic-motion'
import { useNavigate } from 'react-router-dom'

export function HomePage() {

    const navigate = useNavigate()
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const toggleSignUp = () => setIsSignUp(prevState => !prevState)

    const goToAboutPage = () => navigate('/about')

    return (
        <section className="min-h-screen max-h-screen flex items-stretch text-white">

            <div 
                style={{ backgroundImage: "url(https://th.bing.com/th/id/OIP.I96jXmN6P6pK4w26Q9YMcQHaEK?pid=ImgDet&rs=1)" }}
                className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
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
                        <button type="button" onClick={() => toggleSignUp()} className="text-slate-800 uppercase block tracking-widest font-extrabold w-2/4 p-4 text-lg rounded-full bg-gradient-to-r from-violet-200 to-pink-200 absolute -bottom-32 left-32">
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>

            </div>

            <MagicMotion>
                <div
                    style={{ backgroundColor: "#161616" }}
                    className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
                >
                    <div className="w-full py-6 z-20">
                        <h2 className="mb-6 flex flex-wrap flex-col lg:flex-row justify-center text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                            Personal Blog
                        </span> 
                        Control Panel
                        </h2>
                        <p className="text-gray-100">
                            {isSignUp ? 'Create a new personal account' : 'Use your personal account'}
                        </p>
                        <FormBody {...{isSignUp, toggleSignUp}}/>
                    </div>   
                </div>
            </MagicMotion>

            <div className="cursor-pointer group" onClick={() => goToAboutPage()}>
                <span className="fixed -top-12 -left-8 w-[8.8rem] h-[7.5rem] rounded-full backdrop-blur-lg shadow-xl bg-gradient-to-r from-[rgba(191,219,254,0.4)] to-[rgba(165,243,252,0.8)] group-hover:scale-110 transition-all duration-300">
                </span>
                <span className="fixed top-0 left-0 ps-1 pt-4">
                    <p className='text-lg font-bold italic text-slate-800 group-hover:scale-110 transition-all duration-300'>
                        About Page
                    </p>
                </span>
            </div>

        </section>
    )
}
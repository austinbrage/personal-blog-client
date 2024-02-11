import { useState, useEffect, createContext, type ReactElement } from "react"
import { useNavigate, useLocation } from 'react-router-dom'
import { FormBody } from "../components/Login/FormBody"
import { MagicMotion } from 'react-magic-motion'

enum childrenRoutes {
    home = '/',
    demo = '/demo',
    post = '/post'
}

export const LayoutContext = createContext({
    isSignUp: false,
    toggleSignUp: () => {}
})

export function LayoutHome({ children }: { children: ReactElement }) {

    const navigate = useNavigate()
    const location = useLocation()
    
    const [isSignUp, setIsSignUp] = useState<boolean>(false)
    const [selected, setSelected] = useState<childrenRoutes>(childrenRoutes.home)
    
    const toggleSignUp = () => setIsSignUp(prevState => !prevState)

    const goTo = {
        homePage: () => navigate(childrenRoutes.home),
        demoPage: () => navigate(childrenRoutes.demo),
        postPage: () => navigate(childrenRoutes.post),
    }

    useEffect(() => {
        Object.values(childrenRoutes).map(route => {
            if(location.pathname === route) setSelected(route)
        })
    }, [location])
    
    return (
        <>
            <nav className="absolute top-0 left-0 flex min-w-max min-h-max p-[1px] rounded-br-lg border-r-2 border-b-2 text-white border-[#342C2C] z-50">
                <div 
                    onClick={() => goTo.homePage()}
                    className={`
                        p-3 backdrop-blur-md cursor-pointer group
                        ${selected === childrenRoutes.home 
                            ? 'bg-[rgba(28,29,36,0.5)] opacity-100' 
                            : 'bg-[rgba(46,48,52,0.2)] opacity-50'
                        }
                    `.trim()}
                >
                    <p className="text-lg font-semibold tracking-wider transition-all duration-500 group-hover:tracking-widest hover:transition-all">
                        Home
                    </p>
                </div>
                <div 
                    onClick={() => goTo.demoPage()}
                    className={`
                        p-3 backdrop-blur-md cursor-pointer group
                        ${selected === childrenRoutes.demo 
                            ? 'bg-[rgba(28,29,36,0.5)] opacity-100' 
                            : 'bg-[rgba(46,48,52,0.6)] opacity-50'
                        }
                    `.trim()}
                >
                    <p className="text-lg font-semibold tracking-wider transition-all duration-500 group-hover:tracking-widest hover:transition-all">
                        Playground
                    </p>
                </div>
                <div 
                    onClick={() => goTo.postPage()}
                    className={`
                        p-3 backdrop-blur-md cursor-pointer group
                        ${selected === childrenRoutes.post 
                            ? 'bg-[rgba(28,29,36,0.5)] opacity-100' 
                            : 'bg-[rgba(46,48,52,0.8)] opacity-50'
                        }
                    `.trim()}
                >
                    <p className="text-lg font-semibold tracking-wider transition-all duration-500 group-hover:tracking-widest hover:transition-all">
                        Community
                    </p>
                </div>
            </nav>  

            <main className="relative min-h-screen max-w-full flex items-stretch text-white bg-[#161616]">
                
                <section 
                    className={`
                        ${selected === childrenRoutes.home 
                            ? 'lg:block hidden' 
                            : 'lg:w-1/2 w-full'
                        }
                    `}
                >
                    <LayoutContext.Provider value={{ isSignUp, toggleSignUp }}>
                        {children}
                    </LayoutContext.Provider>
                </section>

                <section 
                    className={`
                        ${selected === childrenRoutes.home 
                            ? 'lg:w-1/2 w-full' 
                            : 'lg:flex hidden w-1/2'
                        }
                    `}
                >
                    <MagicMotion>
                        <div
                            style={{ backgroundColor: "#161616" }}
                            className={`
                                flex sticky top-4 max-h-screen h-full items-center justify-center text-center md:px-16 px-0 pt-0 z-0
                                ${(isSignUp && selected !== childrenRoutes.home)
                                    ? 'pt-10' 
                                    : 'pt-0'
                                }
                            `}
                        >
                            <div className="w-full py-6 z-20">
                               
                                <h2 className="mb-6 flex flex-wrap flex-col lg:flex-row justify-center text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                                        Personal Blog
                                    </span> 
                                    Control Panel
                                </h2>
                                
                                <p className="text-gray-100">
                                    {isSignUp 
                                        ? 'Create a new personal account' 
                                        : 'Use your personal account'
                                    }
                                </p>
                                
                                <FormBody {...{isSignUp, toggleSignUp}}>
                                    
                                    {selected !== childrenRoutes.home && (
                                        <button 
                                            type='button' 
                                            onClick={() => toggleSignUp()} 
                                            className={`
                                                hidden lg:block text-slate-800 uppercase tracking-widest font-extrabold mt-3 p-4 rounded-full bg-gradient-to-r from-violet-200 to-pink-200
                                                ${isSignUp
                                                    ? 'relative text-md bottom-[4.5rem] left-[22rem] w-32'
                                                    : 'text-lg w-full'
                                                }
                                            `}
                                        >
                                            {isSignUp ? 'Sign In' : 'Sign Up'}
                                        </button>
                                    )}
                                    
                                </FormBody>
                                
                            </div>   
                        </div>
                    </MagicMotion>
                </section>

            </main>
        </>
    )
}
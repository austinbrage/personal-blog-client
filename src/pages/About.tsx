import { useNavigate } from 'react-router-dom'
import { IoArrowRedoSharp } from "react-icons/io5"
import { FaQuestionCircle } from "react-icons/fa"
import { FaUsersGear } from "react-icons/fa6"
import { FaGithub } from "react-icons/fa"

export function AboutPage() {

    const navigate = useNavigate()
    const goToHomePage = () => navigate('/')

    return (
        <>
            <h1 className="p-14 font-main-title text-5xl text-white">
                Personal Blog App
            </h1>
            <img 
                alt="Background image" 
                src="https://wallpaperaccess.com/full/452059.png" 
                className="fixed top-0 left-0 min-h-screen -z-50"
            />
            <section>
                <div className="grid grid-cols-2 gap-10 w-full px-16">
                    
                    <div className="h-[16rem] p-4 border-4 border-violet-300 rounded-lg backdrop-blur-md bg-[rgba(255,255,255,0.1)]">
                        <div className="pb-2 text-2xl text-white">
                            <FaQuestionCircle/>
                        </div>
                        <h4 className="pb-1 font-bold text-2xl text-violet-100 border-b-4 border-white">
                            What is it?
                        </h4>
                        <p className="pt-2 font-semibold italic text-md text-violet-300">
                            The personal blog application allows ALL developers to write their own blog post by an intuitive dashboard to put the text, choose the styles and build the structure. 
                        </p>
                        <p className="pt-4 font-semibold italic text-lg text-violet-300">
                            With the aim of making that post available from their post PERSONAL WEBSITE or PORTFOLIO.
                        </p>
                    </div>
                    
                    <div className="h-[16rem] p-4 border-4 border-violet-300 rounded-lg backdrop-blur-md bg-[rgba(255,255,255,0.1)]">
                        <div className="pb-2 text-2xl text-white">
                            <FaUsersGear/>
                        </div>
                        <h4 className="pb-1 font-bold text-2xl text-violet-100 border-b-4 border-white">
                            How it works?
                        </h4>
                        <p className="pt-2 font-semibold italic text-md text-violet-300">
                            Developers write their ideas on the dashboard, the set the title, description, image and different sections to print their ideas. Styling all of this using options derived from tailwind classes.
                        </p>
                        <p className="pt-4 font-semibold italic text-lg text-violet-300">
                            Once done the use the PERSONAL-BLOG-COMPONENT available on NPM and use it in their portfolios to get ther posts.
                        </p>
                    </div>

                    <div className="flex gap-4 justify-around py-3 px-5 rounded-xl backdrop-blur-md bg-[rgba(30,41,59,0.4)] border-2 border-dashed border-voilet-300 cursor-pointer hover:scale-110 transition-all duration-300">
                        <p className="text-xl font-bold text-slate-200">
                            Wanna see some examples?
                        </p>
                        <p className="text-xl italic text-white">
                            Check our community
                        </p>
                        <span className="text-3xl">
                            <IoArrowRedoSharp/>
                        </span>
                    </div>

                    <div 
                        onClick={() => goToHomePage()}
                        className="flex gap-4 justify-around py-3 px-5 rounded-xl backdrop-blur-md bg-[rgba(30,41,59,0.4)] border-2 border-dashed border-voilet-300 cursor-pointer hover:scale-110 transition-all duration-300"
                    >
                        <p className="text-xl font-bold text-slate-200">
                            Wanna start creating?
                        </p>
                        <p className="text-xl italic text-white">
                            Login and begin
                        </p>
                        <span className="text-3xl">
                            <IoArrowRedoSharp/>
                        </span>
                    </div>

                </div>
            </section>

            <footer className="fixed bottom-0 left-0 w-max h-16 pt-3 px-10 rounded-xl backdrop-blur-md bg-[rgba(15,23,42,0.3)]">
                <a
                    target='_blank'
                    href='https://github.com/austinbrage/personal-blog-client'
                    className="flex items-center gap-5"
                >
                    <span className="text-2xl font-bold">
                        <FaGithub/>
                    </span>
                    <span className="front-bold italic text-xl text-white">
                        Check out the code
                    </span>
                </a>
            </footer>
        </>
    )
}
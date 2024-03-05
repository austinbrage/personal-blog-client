import { useContext } from "react"
import { useNavigate } from "react-router-dom" 
import { useSectionData } from "../hooks/useSections"
import { ArticleContext } from "../context/articles"
import { SectionContent } from "../components/Sections/SectionContent"

export function ArticlePage() {
    
    const { sectionData } = useSectionData()
    
    const navigate = useNavigate()
    const { articleData } = useContext(ArticleContext)

    if(articleData === null) return (
        <div className="h-screen text-xl text-white">
            <p>No article found</p>
            <p>Please try again</p>
        </div>
    )

    return (
        <article className="relative min-h-screen text-white bg-[rgb(15,15,24)]">

            <div className="pt-10">
                <div className="flex flex-col items-center justify-center w-full px-10 mt-5 text-center">
                   
                    <h4 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-dm-sans tracking-wider">
                        {articleData.title}
                    </h4>
                    
                    <div className='relative mt-5 w-full rounded-md'>
                        <img 
                            src="https://th.bing.com/th/id/OIP.rXaXp7QU8INIhQWoxnZYlgHaEo?rs=1&pid=ImgDetMain" 
                            alt="Post card background image"
                            className='absolute top-0 left-0 w-full h-3/4 opacity-80 rounded-lg' 
                        />
                        <div className='w-full rounded-lg backdrop-blur-md bg-[rgba(32,32,37,0.5)]'>
                            <div className='flex flex-col items-center justify-center w-full'>
                                {articleData.image && (
                                    <img 
                                        src={articleData.image} 
                                        alt={`${articleData.name} image post`} 
                                        style={{ aspectRatio: '16/9' }}
                                        className='my-5 w-4/5 rounded-md'
                                    />
                                )}
                                <p className="mt-5 mb-10 line-clamp-6 font-dm-sans font-semibold text-center text-lg md:text-xl text-[rgb(229,231,235)]">
                                    {articleData.description}
                                </p>
                            </div>
                            <div className='flex flex-wrap gap-5 items-center justify-start md:justify-end ms-4 me-0 md:ms-0 md:me-4 mb-4'>
                                {articleData.keywords.split(',').map(elem => (
                                    <span key={elem} className='flex px-4 py-2 border rounded-lg font-dm-sans text-sm md:text-md tracking-wide text-gray-200 bg-gray-800 border-gray-700'>
                                        {elem}
                                    </span>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </div>  
                                   
            {sectionData.map(elem => (
                <div
                    key={elem.id} 
                    className='flex items-center justify-center h-max px-4 mt-3 w-full'  
                >
                    <SectionContent currentData={elem}/>
                </div>
            ))}

            <button 
                type="button"
                onClick={() => navigate('/post')}
                className="button-go-back fixed bottom-10 left-5 rounded-xl backdrop-blur-lg bg-[rgba(22,22,22,0.5)]"
            >
                <div className="button-box">
                    <span className="button-elem">
                        <svg viewBox="0 0 46 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                        </svg>
                    </span>
                    <span className="button-elem">
                        <svg viewBox="0 0 46 40">
                            <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z"></path>
                        </svg>
                    </span>
                </div>
            </button>

        </article>
    )
}
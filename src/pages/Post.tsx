import { useState, useEffect } from 'react'
import { useArticleKeywordData, useArticleAllData } from "../hooks/useArticles"
import { SelectKeywords } from '../components/Dropdowns/SelectKeyword'
import { type ArticleInfo } from '../types/articles'

export function PostPage() {

    const [selectedKeys, setSelectedKeys] = useState<string[]>([])
    const [currentData, setCurrentData] = useState<ArticleInfo['fullData'][]>([])

    const { articleData, fetchNextArticles } = useArticleAllData({ 
        perPage: 2, 
        currentPage: 1 
    })

    const { articleDataFilter, fetchNextArticlesFilter } = useArticleKeywordData({ 
        perPage: 2, 
        currentPage: 1, 
        keywords: selectedKeys 
    })

    const handleShowMore = () => {
        selectedKeys.length === 0
            ? fetchNextArticles()
            : fetchNextArticlesFilter()
    }
 
    useEffect(() => {
        selectedKeys.length === 0
            ? setCurrentData(articleData)
            : setCurrentData(articleDataFilter)
    }, [selectedKeys, setCurrentData, articleData, articleDataFilter])

    return (
        <div className="w-full h-full p-5 pt-16 text-white bg-[#2e2e2e]">
            
            <div className='flex items-center justify-between mb-10'>
                <h3 className='font-semibold tracking-wider text-4xl'>
                    Published Posts
                </h3>
                <SelectKeywords {...{selectedKeys, setSelectedKeys}}/>
            </div>                    

            <div className='grid grid-cols-2 gap-2'>
                {currentData.map(post => (
                    <article
                        key={post.id}
                        className="rounded-lg shadow-2xl shadow-gray-500/20 transition-all scale-100 bg-[hsl(227.1,46.7%,5.9%)] hover:scale-105 hover:transition-all cursor-pointer"
                    >
                        {post.image && (
                            <div className="aspect-video rounded-lg">
                                <img 
                                    src={post.image} 
                                    alt={`${post.title} Image`}
                                    className="rounded-lg" 
                                />
                            </div>
                        )}
                        <div className="flex flex-col justify-between px-5 py-8 md:px-8">
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white">
                                    {post.title}
                                </h3>
                                <p className="line-clamp-3 w-full pt-3 text-gray-600 dark:text-gray-400">
                                    {post.description}
                                </p>
                            </div>
                        </div>

                    </article>
                ))}
            </div>

            <div>
                <button 
                    type="button"
                    onClick={() => handleShowMore()}
                    className='text-2xl'
                >
                    Show more
                </button>
            </div>

        </div>
    )
}
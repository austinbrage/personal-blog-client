import { useState, createContext, type ReactNode } from 'react'
import { type ArticleInfo } from '../types/articles'

type Context = {
    articleData: ArticleInfo['fullData'] | null
    articleId: string
    updateArticleData: (newData: ArticleInfo['fullData']) => void
    updateArticleId: (newData: string) => void
}

const initialContext: Context = {
    articleData: null,
    articleId: '',
    updateArticleData: () => {},
    updateArticleId: () => {}
}

export const ArticleContext = createContext<Context>(initialContext)

export const ArticleContextProvider = ({ children }: { children: ReactNode }) => {
    
    const [articleData, setArticleData] = useState<ArticleInfo['fullData'] | null>(null)
    const [articleId, setArticleId] = useState<string>('')

    const updateArticleData = (newData: ArticleInfo['fullData']) => setArticleData(newData) 
    const updateArticleId = (newId: string) => setArticleId(newId)
    
    return (
        <ArticleContext.Provider value={{ articleData, articleId, updateArticleData, updateArticleId }}>
            {children}
        </ArticleContext.Provider>
    )
}
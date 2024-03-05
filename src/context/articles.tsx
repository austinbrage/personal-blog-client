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
    
    const storedData = localStorage.getItem('articleData')
    const intialData = storedData ? JSON.parse(storedData) : null

    const storedId = localStorage.getItem('articleId')
    const initialId = storedId ?? ''

    const [articleData, setArticleData] = useState<ArticleInfo['fullData'] | null>(intialData)    
    const [articleId, setArticleId] = useState<string>(initialId)

    const updateArticleData = (newData: ArticleInfo['fullData']) => {
        setArticleData(newData)
        localStorage.setItem('articleData', JSON.stringify(newData))
    } 
    const updateArticleId = (newId: string) => {
        setArticleId(newId)
        localStorage.setItem('articleId', newId)
    }
    
    return (
        <ArticleContext.Provider value={{ articleData, articleId, updateArticleData, updateArticleId }}>
            {children}
        </ArticleContext.Provider>
    )
}
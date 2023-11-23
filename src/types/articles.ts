import { type APIResponse } from "./api"

//* 1- Article Service Arguments Types 
export type ArticleInfo = {
    id: {
        id: number
    }
    idPublishment: {
        id: number
        is_publish: boolean
    }
    data: {
        name: string
        title: string
        keywords: string
        description: string
    }
    fullData: {
        id: number
        user_id: number
        name: string
        title: string
        keywords: string
        description: string
        image: Blob | null
        is_publish: boolean
        created_at: Date
    }
}

//* 2- Article Service Return Types 
export type ArticleResponse = {
    noData: APIResponse<null>
    data: APIResponse< ArticleInfo['fullData'] >
}

//* 3- Article Service Interface 
export interface IArticle {
    url: string
    getData: () => Promise< ArticleResponse['data'] >
    changePublishment: ({ id, is_publish }: ArticleInfo['idPublishment']) => Promise< ArticleResponse['noData'] >
    changeData: ({ name, title, keywords, description }: ArticleInfo['data']) => Promise< ArticleResponse['noData'] >
    insertNew: ({ name, title, keywords, description }: ArticleInfo['data']) => Promise< ArticleResponse['noData'] >
    removeData: ({ id }: ArticleInfo['id']) => Promise< ArticleResponse['noData'] >
}
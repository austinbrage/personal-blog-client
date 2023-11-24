import { type APIResponse } from "./api"

//* 1- Article Service Arguments Types 
export type ArticleInfo = {
    token: {
        token: string
    }
    id: {
        id: number
        token: string
    }
    idPublishment: {
        id: number
        is_publish: boolean
        token: string 
    }
    data: {
        name: string
        title: string
        keywords: string
        description: string
        token: string
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
    getData: ({ token }: ArticleInfo['token']) => Promise< ArticleResponse['data'] >
    changePublishment: ({ id, is_publish, token }: ArticleInfo['idPublishment']) => Promise< ArticleResponse['noData'] >
    changeData: ({ name, title, keywords, description, token }: ArticleInfo['data']) => Promise< ArticleResponse['noData'] >
    insertNew: ({ name, title, keywords, description, token }: ArticleInfo['data']) => Promise< ArticleResponse['noData'] >
    removeData: ({ id, token }: ArticleInfo['id']) => Promise< ArticleResponse['noData'] >
}
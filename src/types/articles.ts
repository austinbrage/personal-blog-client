import { type APIResponse } from "./api"

//* 1- Article Service Arguments Types 
export type ArticleInfo = {
    id: {
        id: number
    }
    name: {
        name: string
    }
    idName: {
        id: number
        name: string
    }
    idDescription: {
        id: number
        description: string
    }
    idPublishment: {
        id: number
        is_publish: boolean
    }
    fullData: {
        id: number
        user_id: number
        name: string
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
    changeName: ({ id, name }: ArticleInfo['idName']) => Promise< ArticleResponse['noData'] >
    changeDescription: ({ id, description }: ArticleInfo['idDescription']) => Promise< ArticleResponse['noData'] >
    changePublishment: ({ id, is_publish }: ArticleInfo['idPublishment']) => Promise< ArticleResponse['noData'] >
    insertNew: ({ name }: ArticleInfo['name']) => Promise< ArticleResponse['noData'] >
    removeData: ({ id }: ArticleInfo['id']) => Promise< ArticleResponse['noData'] >
}
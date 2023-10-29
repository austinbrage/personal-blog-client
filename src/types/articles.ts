import { type APIResponse } from "./api"

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

export type ArticleResponse = {
    noData: APIResponse<null>
    data: APIResponse< ArticleInfo['fullData'] >
}

export interface IArticle {
    url: URL
    getData: () => Promise< ArticleResponse['data'] >
    changeName: ({ id, name }: ArticleInfo['idName']) => Promise< ArticleResponse['noData'] >
    changeDescription: ({ id, description }: ArticleInfo['idDescription']) => Promise< ArticleResponse['noData'] >
    changePublishment: ({ id, is_publish }: ArticleInfo['idPublishment']) => Promise< ArticleResponse['noData'] >
    insertNew: ({ name }: ArticleInfo['name']) => Promise< ArticleResponse['noData'] >
    removeData: ({ id }: ArticleInfo['id']) => Promise< ArticleResponse['noData'] >
}
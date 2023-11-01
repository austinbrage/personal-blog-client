import { type APIResponse } from "./api"

type CommonState = {
    data: [] | null[]
    message: string
    hasFail: string
    hasError: unknown
    isLoading: boolean
}

//* 1- Artilce Store State Types 
export type ArticleState = {
    articleData: { data: ArticleInfo['fullData'][] | [] } & Omit<CommonState, 'data'>
    articleNew: CommonState
    articleName: CommonState
    articleRemove: CommonState
    articleDescription: CommonState
    articlePublishment: CommonState
}

//* 2- Article Store Action Types 
export type ArticleAction = {
    getData: () =>                                                            Promise<void>
    removeData: ({ id }: ArticleInfo['id']) =>                                Promise<void>
    insertNew: ({ name }: ArticleInfo['name']) =>                             Promise<void>
    changeName: ({ id, name }: ArticleInfo['idName']) =>                      Promise<void>
    changePublishment: ({ id, is_publish }: ArticleInfo['idPublishment']) =>  Promise<void>
    changeDescription: ({ id, description }: ArticleInfo['idDescription']) => Promise<void>
}

//* 3- Article Service Arguments Types 
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

//* 4- Article Service Return Types 
export type ArticleResponse = {
    noData: APIResponse<null>
    data: APIResponse< ArticleInfo['fullData'] >
}

//* 5- Article Service Interface 
export interface IArticle {
    url: URL
    getData: () => Promise< ArticleResponse['data'] >
    changeName: ({ id, name }: ArticleInfo['idName']) => Promise< ArticleResponse['noData'] >
    changeDescription: ({ id, description }: ArticleInfo['idDescription']) => Promise< ArticleResponse['noData'] >
    changePublishment: ({ id, is_publish }: ArticleInfo['idPublishment']) => Promise< ArticleResponse['noData'] >
    insertNew: ({ name }: ArticleInfo['name']) => Promise< ArticleResponse['noData'] >
    removeData: ({ id }: ArticleInfo['id']) => Promise< ArticleResponse['noData'] >
}
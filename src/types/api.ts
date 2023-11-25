import { UserInfo } from "./users"
import { ArticleInfo } from "./articles"
import { SectionInfo } from "./sections"

type APIState = {
    userData: UserInfo['fullData'][] | []
    articleData: ArticleInfo['fullData'][] | []
    sectionData: SectionInfo['idData'][] | []
    userSession: boolean
    userToken: string
}

type APIAction = {
    updateUser: (payload: UserInfo['fullData'][]) => void
    updateArticle: (payload: ArticleInfo['fullData'][]) => void
    updateSection: (payload: SectionInfo['idData'][]) => void
    updateUserSession: (payload: UserState) => void
    updateUserToken: (payload: string) => void
}

export type UserState = 'onSession' | 'offSession'

export type APIStore = APIState & APIAction

type ErrorResponse = {
    success: false
    error: {
        status: 'fail' | 'error',
        message: string
        validationError: object
    }
}

type OkResponse<T> = {
    success: true
    result: { 
        message: string 
        data: T extends null ? null : Array<T> 
        token: T extends 'token' ? string : null  
    } 
}

export type APIResponse<T> = ErrorResponse | OkResponse<T>
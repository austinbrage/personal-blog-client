import { UserInfo } from "./users"
import { ArticleInfo } from "./articles"
import { SectionInfo } from "./sections"

type APIState = {
    userData: UserInfo['fullData'][] | []
    articleData: ArticleInfo['fullData'][] | []
    sectionData: SectionInfo['idData'][] | []
    userValidated: boolean
}

type APIAction = {
    updateUser: (payload: UserInfo['fullData'][]) => void
    updateArticle: (payload: ArticleInfo['fullData'][]) => void
    updateSection: (payload: SectionInfo['idData'][]) => void
    updateUserState: (payload: UserState) => void
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
    } 
}

export type APIResponse<T> = ErrorResponse | OkResponse<T>
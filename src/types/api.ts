import { UserInfo } from "./users"
import { ArticleInfo } from "./articles"
import { type ProcessedSection, type RawSection } from "./sections"

type APIState = {
    userData: UserInfo['fullData'][] | []
    articleData: ArticleInfo['fullData'] | null
    sectionData: ProcessedSection | null
    contentData: Pick<RawSection, "content"> | null
    stylesData: {
        raw?: Omit<RawSection, "content">, 
        processed?: Pick<ProcessedSection, "content"> 
    }
    editMode: boolean
    userSession: boolean
    sectionId: number
    articleId: string
    userToken: string
}

type APIAction = {
    updateUserData: (payload: UserInfo['fullData'][]) => void
    updateArticleData: (payload: ArticleInfo['fullData']) => void
    updateSectionData: (payload: ProcessedSection) => void
    updateContentData: (payload: Pick<RawSection, "content">) => void
    updateStylesData: (payload: Omit<RawSection, "content">) => void
    updateEditMode: (payload: { mode: boolean }) => void
    updateUserSession: (payload: UserState) => void
    updateSectionId: (payload: number) => void
    updateArticleId: (payload: string) => void
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
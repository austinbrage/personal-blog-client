import { type ArticleInfo } from "./articles"
import { type ProcessedSection, type RawSection } from "./sections"

type APIState = {
    articleData: ArticleInfo['fullData'] | null
    sectionData: ProcessedSection | null
    newSectionData: {
        raw?: RawSection, 
        processed?: Omit<ProcessedSection, "id">
    }
    addMode: boolean
    editMode: boolean
    sectionId: number
    articleId: string
    userToken: string
}

type APIAction = {
    updateArticleData: (payload: ArticleInfo['fullData']) => void
    updateSectionData: (payload: ProcessedSection) => void
    updateNewSectionData: (payload: Omit<ProcessedSection, "id">) => void
    updateSectionId: (payload: number) => void
    updateArticleId: (payload: string) => void
    updateUserToken: (payload: string) => void
    updateAddMode: (payload: boolean) => void
    updateEditMode: (payload: boolean) => void
}

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
        currentPage: T extends Array<object> ? number : null  
    } 
}

export type APIResponse<T> = ErrorResponse | OkResponse<T>
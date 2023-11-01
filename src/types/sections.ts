import { type APIResponse } from "./api"

type CommonState = {
    data: [] | null[]
    message: string
    hasFail: string
    hasError: unknown
    isLoading: boolean
}

//* 1- Section Store State Types 
export type SectionState = {
    sectionData: { data: SectionInfo['idData'][] | [] } & Omit<CommonState, 'data'>
    sectionNew: CommonState
    sectionChange: CommonState
    sectionRemove: CommonState
}

//* 2- Section Store Action Types 
export type SectionAction = {
    getData: ({ article_id }: SectionInfo['articleId']) =>  Promise<void>
    inserNew: (data: SectionInfo['articleIdData']) =>       Promise<void>
    changeAll: (data: SectionInfo['idData']) =>             Promise<void>
    removeData: ({ id }: SectionInfo['id']) =>              Promise<void>
}

type Data = {
    content: string 
    font_size: string 
    font_weight: string 
    font_family: string 
    line_height: string 
    margin_top: string 
    text_align: string 
    text_color: string
}

//* 4- Section Service Arguments Types 
export type SectionInfo = {
    id: { id: number }
    idData: { id: number } & Data
    articleId: { article_id: string } //Type of string due to the searchParams.append functionality
    articleIdData: { article_id: number } & Data
}

//* 5- Section Service Interface 
export type SectionResponse = {
    noData: APIResponse<null>
    data: APIResponse< SectionInfo['idData'] > // It doesn't contemplate the sequence field
}

//* 5- Section Service Interface 
export interface ISection {
    url: URL
    getData: ({ article_id }: SectionInfo['articleId']) => Promise< SectionResponse['data'] >
    changeAll: ({
        id,
        content,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color
    }: SectionInfo['idData']) => Promise< SectionResponse['noData'] >
    inserNew: ({
        article_id,
        content,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color
    }: SectionInfo['articleIdData']) => Promise< SectionResponse['noData'] >
    removeData: ({ id }: SectionInfo['id']) => Promise< SectionResponse['noData'] >
}
import { type APIResponse } from "./api"

//* 1- Section Service Arguments Types 
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

export type SectionInfo = {
    id: { id: number }
    idData: { id: number } & Data
    articleId: { article_id: string } //Type of string due to the searchParams.append functionality
    articleIdData: { article_id: number } & Data
}

//* 2- Section Service Interface 
export type SectionResponse = {
    noData: APIResponse<null>
    data: APIResponse< SectionInfo['idData'] > // It doesn't contemplate the sequence field
}

//* 3- Section Service Interface 
export interface ISection {
    url: string
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
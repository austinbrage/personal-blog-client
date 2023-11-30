import { type APIResponse } from "./api"

//* 1- Section Service Arguments Types 
export type RawSection = {
    content: string 
    font_size: string 
    text_color: string
    margin_top: string 
    text_align: string 
    font_weight: string 
    font_family: string 
    line_height: string 
}

export type ProcessedSection = {
    id: number
    content: string
    styles: {
        color: string
        fontSize: string 
        marginTop: string 
        textAlign: string 
        fontWeight: string 
        fontFamily: string 
        lineHeight: string 
    }
}

export type SectionInfo = {
    id: { 
        id: number 
        token: string
    }
    idData: RawSection & { 
        id: number 
        token: string
    } 
    articleId: { 
        article_id: string //Type of string due to the searchParams.append functionality 
        token: string
    } 
    articleIdData: RawSection & { 
        article_id: number 
        token: string
    } 
}

//* 2- Section Service Interface 
export type SectionResponse = {
    noData: APIResponse<null>
    data: APIResponse< SectionInfo['idData'] > // It doesn't contemplate the sequence field
}

//* 3- Section Service Interface 
export interface ISection {
    url: string
    getData: ({ article_id, token }: SectionInfo['articleId']) => Promise< SectionResponse['data'] >
    changeAll: ({
        id,
        content,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color, 
        token
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
        text_color, 
        token
    }: SectionInfo['articleIdData']) => Promise< SectionResponse['noData'] >
    removeData: ({ id, token }: SectionInfo['id']) => Promise< SectionResponse['noData'] >
}
import { widthOptions } from "../enums/width"
import { heightOptions } from "../enums/height"
import { sizeOptions } from "../enums/size"
import { lineOptions } from "../enums/line"
import { alignOptions } from "../enums/align"
import { familyOptions } from "../enums/family"
import { marginOptions } from "../enums/margin"
import { weightOptions } from "../enums/weight"
import { radiusOptions } from "../enums/radius"
import { type APIResponse } from "./api"

//* 1- Section Service Arguments Types 
export type EditorTabs = 
'alignment' | 
'general' | 
'content' | 
'family' | 
'weight' | 
'margin' | 
'color' | 
'size' | 
'line' |
'width' |
'height' |
'radius' 

export type ContentType = 
'image' |
'title' |
'subtitle' |
'paragraph' |
'blockquote' |
'javascript' |
'typescript' |
'jsx'

export type RawSection = {
    content: string 
    content_type: ContentType
    image_url: string | null
    text_color: string
    width: widthOptions
    height: heightOptions
    font_size: sizeOptions
    margin_top: marginOptions 
    text_align: alignOptions 
    font_weight: weightOptions 
    font_family: familyOptions 
    line_height: lineOptions 
    border_radius: radiusOptions 
}

export type Styles = {
    color: string
    width: widthOptions
    height: heightOptions
    fontSize: sizeOptions 
    marginTop: marginOptions
    textAlign: alignOptions 
    fontWeight: weightOptions 
    fontFamily: familyOptions 
    lineHeight: lineOptions 
    borderRadius: radiusOptions 
}

export type ContentStyles = {
    content: string
    content_type: ContentType
    image_url: string | null
    styles: Styles
}

export type ProcessedSection = {
    id: number
    content: string
    content_type: ContentType
    image_url: string | null
    styles: Styles
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
        content_type,
        image_url,
        width,
        height,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color, 
        border_radius,
        token
    }: SectionInfo['idData']) => Promise< SectionResponse['noData'] >
    inserNew: ({
        article_id,
        content,
        content_type,
        image_url,
        width,
        height,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color, 
        border_radius,
        token
    }: SectionInfo['articleIdData']) => Promise< SectionResponse['noData'] >
    removeData: ({ id, token }: SectionInfo['id']) => Promise< SectionResponse['noData'] >
}
import { URL } from "url"
import type { ISection, SectionInfo, SectionResponse } from "../types/sections"

export class Section implements ISection {
    url: URL

    constructor(SECTION_URL: URL) {
        this.url = SECTION_URL
    }

    getData = async ({ article_id }: SectionInfo['articleId']) => {
        this.url.searchParams.append('article_id', article_id)
        
        const response = await fetch(this.url)
        return await response.json() as SectionResponse['data']
    }   

    changeAll = async ({
        id,
        content,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color
    }: SectionInfo['idData']) => {
        const options = {
            method: 'PUT',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                id,
                content,
                font_size,
                font_weight,
                font_family,
                line_height,
                margin_top,
                text_align,
                text_color
            })
        }

        const response = await fetch(this.url, options)
        return await response.json() as SectionResponse['noData']
    }
    
    inserNew = async ({
        article_id,
        content,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color
    }: SectionInfo['articleIdData']) => {
        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                article_id,
                content,
                font_size,
                font_weight,
                font_family,
                line_height,
                margin_top,
                text_align,
                text_color
            })
        }

        const response = await fetch(this.url, options)
        return await response.json() as SectionResponse['noData']
    }

    removeData = async ({ id }: SectionInfo['id']) => {
        const options = {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ id })
        }

        const response = await fetch(this.url, options)
        return await response.json() as SectionResponse['noData']
    }
}
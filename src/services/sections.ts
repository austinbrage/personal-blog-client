import { addPath, PATHS, API_URL } from "../utils/config"
import type { ISection, SectionInfo, SectionResponse } from "../types/sections"

export class Section implements ISection {
    url: string

    constructor() {
        this.url = addPath(PATHS.SECTION, API_URL)
    }

    getData = async ({ article_id, token }: SectionInfo['articleId']) => {
        const url = new URL(this.url)
        
        url.searchParams.append('article_id_query', article_id)
        
        const options = {
            headers: new Headers({'Authorization': `Bearer ${token}`}),
        }
        
        const response = await fetch(url, options)
        return await response.json() as SectionResponse['data']
    }   

    changeAll = async ({
        id,
        content,
        content_type,
        image_url,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color,
        token
    }: SectionInfo['idData']) => {
        const options = {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                id,
                content,
                content_type,
                image_url,
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
        content_type,
        image_url,
        font_size,
        font_weight,
        font_family,
        line_height,
        margin_top,
        text_align,
        text_color,
        token
    }: SectionInfo['articleIdData']) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                article_id,
                content,
                content_type,
                image_url,
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

    removeData = async ({ id, token }: SectionInfo['id']) => {
        const options = {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ id })
        }

        const response = await fetch(this.url, options)
        return await response.json() as SectionResponse['noData']
    }
}
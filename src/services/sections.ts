import { addPath, PATHS, API_URL } from "../utils/config"
import type { ISection, SectionInfo, SectionResponse } from "../types/sections"
import { APIResponse } from "../types/api"

export class Section implements ISection {
    url: string

    constructor() {
        this.url = addPath(PATHS.SECTION, API_URL)
    }

    getData = async ({ article_id }: SectionInfo['articleId']) => {
        const url = new URL(this.url)
        
        url.searchParams.append('article_id_query', article_id)
        
        const response = await fetch(url)
        return await response.json() as SectionResponse['data']
    }   

    changeSequence =  async ({ data, token }: SectionInfo['idSequenceData']) => {
        const url = addPath('/sequence', this.url)

        const options = {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        return await response.json() as SectionResponse['noData']
    }

    changeAll = async ({
        id,
        content,
        content_type,
        image,
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
                image,
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
            })
        }

        const response = await fetch(this.url, options)
        return await response.json() as SectionResponse['noData']
    }
    
    inserNew = async ({
        article_id,
        content,
        content_type,
        image,
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
                image,
                width,
                height,
                font_size,
                font_weight,
                font_family,
                line_height,
                margin_top,
                text_align,
                border_radius,
                text_color
            })
        }

        const response = await fetch(this.url, options)
        return await response.json() as SectionResponse['noData']
    }

    insertMultiple = async ({ data, token }: SectionInfo['articleIdDatas']) => {
        const url = addPath('/multiple', this.url)

        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(data)
        }

        const response = await fetch(url, options)
        return await response.json() as SectionResponse['noData']
    }

    insertTemplate = async ({ article_id, template_option, token }: SectionInfo['articleIdOption']) => {
        const url = addPath('/template', this.url)

        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ article_id, template_option })
        }

        const response = await fetch(url, options)
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
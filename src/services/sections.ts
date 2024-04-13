import { addPath, PATHS, API_URL } from "../utils/config"
import type { ISection, SectionInfo, SectionResponse } from "../types/sections"

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
    
    changeAllFile = async (data: SectionInfo['idDataFile']) => {
        const url = addPath('/s3', this.url)

        const formData = new FormData()
        formData.append('id', data.id.toString())
        formData.append('content', data.content)
        formData.append('content_type', data.content_type)
        formData.append('image', data.image)
        formData.append('width', data.width)
        formData.append('height', data.height)
        formData.append('font_size', data.font_size)
        formData.append('font_weight', data.font_weight)
        formData.append('font_family', data.font_family)
        formData.append('line_height', data.line_height)
        formData.append('margin_top', data.margin_top)
        formData.append('text_align', data.text_align)
        formData.append('text_color', data.text_color)
        formData.append('border_radius', data.border_radius)

        const options = {
            method: 'PUT',
            headers: new Headers({
                'Authorization': `Bearer ${data.token}`
            }),
            body: formData
        }

        const response = await fetch(url, options)
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

    insertNewFile = async (data: SectionInfo['articleIdDataFile']) => {
        const url = addPath('/s3', this.url)

        const formData = new FormData()
        formData.append('article_id', data.article_id.toString())
        formData.append('content', data.content)
        formData.append('content_type', data.content_type)
        formData.append('image', data.image)
        formData.append('width', data.width)
        formData.append('height', data.height)
        formData.append('font_size', data.font_size)
        formData.append('font_weight', data.font_weight)
        formData.append('font_family', data.font_family)
        formData.append('line_height', data.line_height)
        formData.append('margin_top', data.margin_top)
        formData.append('text_align', data.text_align)
        formData.append('text_color', data.text_color)
        formData.append('border_radius', data.border_radius)

        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${data.token}`
            }),
            body: formData
        }

        const response = await fetch(url, options)
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
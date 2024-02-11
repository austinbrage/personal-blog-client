import { addPath, PATHS, API_URL } from "../utils/config"
import type { IArticle, ArticleInfo, ArticleResponse } from "../types/articles"

export class Article implements IArticle {
    url: string

    constructor() {
        this.url = addPath(PATHS.ARTICLE, API_URL)
    }

    getKeywords = async () => {
        const url = addPath('/keywords', this.url)

        const response = await fetch(url)
        return await response.json() as ArticleResponse['keywords']
    }

    getEverything = async ({ perPage, currentPage }: ArticleInfo['pageNoCondition']) => {
        const url = new URL(addPath('/data/all', this.url))

        url.searchParams.append('perPage', perPage.toString())
        url.searchParams.append('currentPage', currentPage.toString())

        const response = await fetch(url)
        const data = await response.json() as ArticleResponse['pageData']

        const completedData: ArticleResponse['pageData'] = {
            ...(data.success
                ? { success: true, result: { ...data.result, currentPage } }
                : { ...data }
            )
        }

        return completedData        
    }

    getDataByKeywords = async ({ perPage, currentPage, keywords }: ArticleInfo['pageKeywords']) => {
        const url = new URL(addPath('/data/keywords', this.url))

        url.searchParams.append('perPage', perPage.toString())
        url.searchParams.append('currentPage', currentPage.toString())
        keywords.forEach(keyword => url.searchParams.append('keywords', keyword))

        const response = await fetch(url)
        const data = await response.json() as ArticleResponse['pageData']

        const completedData: ArticleResponse['pageData'] = {
            ...(data.success
                ? { success: true, result: { ...data.result, currentPage } }
                : { ...data }
            )
        }

        return completedData             
    }

    getData = async ({ token }: ArticleInfo['token']) => {
        const options = {
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
        }

        const response = await fetch(this.url, options)
        return await response.json() as ArticleResponse['data']
    }

    changeData = async ({ id, name, image, title, keywords, description, token }: ArticleInfo['idData']) => {
        const url = addPath('/data', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ id, name, image, title, keywords, description })
        }

        const response = await fetch(url, options)
        return await response.json() as ArticleResponse['noData']
    }
    
    changePublishment = async ({ id, is_publish, token }: ArticleInfo['idPublishment']) => {
        const url = addPath('/publishment', this.url)

        const options = {
            method: 'PATCH',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ id, is_publish })
        }

        const response = await fetch(url, options)
        return await response.json() as ArticleResponse['noData']
    }
    
    insertNew = async ({ name, image, title, keywords, description, token }: ArticleInfo['data']) => {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ name, image, title, keywords, description })
        }

        const response = await fetch(this.url, options)
        return await response.json() as ArticleResponse['info']
    }
    
    removeData = async ({ id, token }: ArticleInfo['id']) => {
        const options = {
            method: 'DELETE',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ id })
        }

        const response = await fetch(this.url, options)
        return await response.json() as ArticleResponse['noData']
    }
}
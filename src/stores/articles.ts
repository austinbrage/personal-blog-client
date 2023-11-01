import { create } from "zustand"
import { Article } from "../services/articles"
import { API_URL } from "../utils/config"
import { useData } from '../hooks/useData'
import { createMiddlewares } from '../helpers/middlewares'
import type { ArticleState, ArticleAction, ArticleInfo } from "../types/articles"

const myMiddlewares = createMiddlewares<ArticleState>('ARTICLE_STORE')

const commonState = {
    data: [] as [],
    hasFail: '',
    message: '',
    hasError: false,
    isLoading: false
}

export const useArticleStore = create<ArticleState>()( myMiddlewares( () => ({
    articleData: commonState,
    articleName: commonState,
    articleNew: commonState,
    articleDescription: commonState,
    articlePublishment: commonState,
    articleRemove: commonState
})))

export class ArticleActions implements ArticleAction {
    private articleService: Article

    constructor() {
        const ARTICLE_URL = new URL('/article', API_URL)
        this.articleService = new Article(ARTICLE_URL)
    }

    getData = async () => {
        const result = await useData(this.articleService.getData())
        useArticleStore.setState(({ articleData: result }), false, 'GET_ARTICLE_DATA')
    }

    removeData = async (data: ArticleInfo['id']) => {
        const result = await useData(this.articleService.removeData(data))
        useArticleStore.setState(({ articleRemove: result }), false, {
            type: 'REMOVE_ARTICLE', data
        })
    }

    insertNew = async (data: ArticleInfo['name']) => {
        const result = await useData(this.articleService.insertNew(data))
        useArticleStore.setState(({ articleNew: result }), false, {
            type: 'INSERT_NEW_ARTICLE', data
        })
    }

    changeName = async (data: ArticleInfo['idName']) => {
        const result = await useData(this.articleService.changeName(data))
        useArticleStore.setState(({ articleName: result }), false, {
            type: 'CHANGE_ARTICLE_NAME', data
        })
    }

    changePublishment = async (data: ArticleInfo['idPublishment']) => {
        const result = await useData(this.articleService.changePublishment(data))
        useArticleStore.setState(({ articlePublishment: result }), false, {
            type: 'CHANGE_ARTICLE_PUBLISHMENT', data
        })
    }

    changeDescription = async (data: ArticleInfo['idDescription']) => {
        const result = await useData(this.articleService.changeDescription(data))
        useArticleStore.setState(({ articleDescription: result }), false, {
            type: 'CHANGE_ARTICLE_DESCRIPTION', data
        })
    }
}
import { create } from "zustand"
import { createMiddlewares } from '../helpers/middlewares'
import { type APIStore } from "../types/api"

const myMiddlewares = createMiddlewares<APIStore>('GLOBAL_API_STORE')

export const useAPIStore = create<APIStore>()(myMiddlewares((set) => ({
    userData: [],
    userToken: '',
    articleId: '',
    sectionId: 0,
    articleData: null,
    sectionData: null,
    userSession: false,

    updateUserData: (newData) => {
        set(state => ({ ...state, userData: newData }), false, {
            type: 'UPDATE_USER', newData
        })
    },

    updateArticleData: (newData) => {
        set(state => ({ ...state, articleData: newData }), false, {
            type: 'UPDATE_ARTICLE_DATA', newData
        })
    },

    updateArticleId: (newId) => {
        set(state => ({ ...state, articleId: newId }), false, {
            type: 'UPDATE_ARTICLE_ID', newId
        })
    },

    updateSectionId: (newId) => {
        set(state => ({ ...state, sectionId: newId }), false, {
            type: 'UPDATE_SECTION_ID', newId
        })
    },

    updateSectionData: (newData) => {
        set(state => ({ ...state, sectionData: newData }), false, {
            type: 'UPDATE_SECTION_DATA', newData
        })
    },

    updateUserToken: (newToken) => {
        set(state => ({ ...state, userToken: newToken }), false, {
            type: 'USER_TOKEN', newToken
        })
    },
    
    updateUserSession: (newState) => {
        newState === 'onSession' && set({ userSession: true }, false, 'ON_SESSION')
        newState === 'offSession' && set({ userSession: false }, false, 'OFF_SESSION')
    }
})))
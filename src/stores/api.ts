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
    contentData: null,
    stylesData: {},
    editMode: false,
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

    updateContentData: (newData) => {
        set(state => ({ ...state, contentData: newData }), false, {
            type: 'UPDATE_CONTENT_DATA', newData
        })
    },

    updateStylesData: (newData) => {
        const processed = {
            fontSize: newData.font_size,
            fontWeight: newData.font_weight,
            fontFamily: newData.font_family,
            color: newData.text_color,
            textAlign: newData.text_align,
            lineHeight: newData.line_height,
        }
        set(state => ({ ...state, stylesData: { raw: newData, processed } }), false, {
            type: 'UPDATE_STYLES_DATA', newData
        })
    },

    updateEditMode: (newData) => {
        set(state => ({ ...state, editMode: newData.mode }), false, {
            type: 'UPDATE_EDIT_MODE', newData
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
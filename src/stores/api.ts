import { create } from "zustand"
import { createMiddlewares } from '../helpers/middlewares'
import { type APIStore } from "../types/api"

const myMiddlewares = createMiddlewares<APIStore>('GLOBAL_API_STORE')

export const useAPIStore = create<APIStore>()(myMiddlewares((set) => ({
    articleData: null,
    sectionData: null,
    newSectionData: {},
    editMode: false,
    sectionId: 0,
    articleId: '',
    userToken: '',
    
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

    updateNewSectionData: (newData) => {
        const processed = {
            content: newData.content,
            color: newData.text_color,
            fontSize: newData.font_size,
            textAlign: newData.text_align,
            fontWeight: newData.font_weight,
            fontFamily: newData.font_family,
            lineHeight: newData.line_height,
        }
        set(state => ({ ...state, stylesData: { raw: newData, processed } }), false, {
            type: 'UPDATE_NEW_SECTION_DATA', newData
        })
    },

    updateEditMode: (newData) => {
        set(state => ({ ...state, editMode: newData }), false, {
            type: 'UPDATE_EDIT_MODE', newData
        })
    },

    updateUserToken: (newToken) => {
        set(state => ({ ...state, userToken: newToken }), false, {
            type: 'USER_TOKEN', newToken
        })
    },
})))
import { create } from "zustand"
import { createMiddlewares } from '../helpers/middlewares'
import { type APIStore } from "../types/api"

const myMiddlewares = createMiddlewares<APIStore>('GLOBAL_API_STORE')

export const useAPIStore = create<APIStore>()(myMiddlewares((set) => ({
    userData: [],
    articleData: [],
    sectionData: [],
    userSession: false,

    updateUser: (newData) => {
        set(state => ({ ...state, userData: newData }), false, {
            type: 'UPDATE_USER', newData
        })
    },

    updateArticle: (newData) => {
        set(state => ({ ...state, userArticle: newData }), false, {
            type: 'UPDATE_ARTICLE', newData
        })
    },

    updateSection: (newData) => {
        set(state => ({ ...state, userSection: newData }), false, {
            type: 'UPDATE_SECTION', newData
        })
    },

    updateUserSession: (newState) => {
        newState === 'onSession' && set({ userSession: true }, false, 'ON_SESSION')
        newState === 'offSession' && set({ userSession: false }, false, 'OFF_SESSION')
    }
})))
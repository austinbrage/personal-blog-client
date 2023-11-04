import { create } from "zustand"
import { createMiddlewares } from '../helpers/middlewares'
import { type APIStore } from "../types/api"

const myMiddlewares = createMiddlewares<APIStore>('GLOBAL_API_STORE')

export const useAPIStore = create<APIStore>()(myMiddlewares((set) => ({
    userData: [],
    articleData: [],
    sectionData: [],
    userValidated: false,

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

    updateUserState: (newState) => {
        newState === 'onSession' && set({ userValidated: true }, false, 'ON_SESSION')
        newState === 'offSession' && set({ userValidated: false }, false, 'OFF_SESSION')
    }
})))
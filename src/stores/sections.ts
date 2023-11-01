import { create } from 'zustand'
import { Section } from '../services/sections'
import { API_URL } from '../utils/config'
import { useData } from '../hooks/useData'
import { createMiddlewares } from '../helpers/middlewares'
import type { SectionState, SectionAction, SectionInfo } from '../types/sections'

const myMiddlewares = createMiddlewares<SectionState>('SECTION_STORE')

const commonState = {
    data: [] as [],
    hasFail: '',
    message: '',
    hasError: false,
    isLoading: false
}

export const useSectionStore = create<SectionState>()( myMiddlewares( () => ({
    sectionData: commonState,
    sectionNew: commonState,
    sectionChange: commonState,
    sectionRemove: commonState
})))

export class SectionActions implements SectionAction {
    private sectionService: Section

    constructor() {
        const SECTION_URL = new URL('/section', API_URL)
        this.sectionService = new Section(SECTION_URL)
    }

    getData = async (data: SectionInfo['articleId']) => {
        const result = await useData(this.sectionService.getData(data))
        useSectionStore.setState(({ sectionData: result }), false, {
            type: 'GET_SECTION_DATA', data
        })
    }

    inserNew = async (data: SectionInfo['articleIdData']) => {
        const result = await useData(this.sectionService.inserNew(data))
        useSectionStore.setState(({ sectionNew: result }), false, {
            type: 'INSERT_NEW_SECTION', data
        })
    }

    changeAll = async (data: SectionInfo['idData']) => {
        const result = await useData(this.sectionService.changeAll(data))
        useSectionStore.setState(({ sectionChange: result }), false, {
            type: 'CHANGE_SECTION', data
        })
    }

    removeData = async (data: SectionInfo['id']) => {
        const result = await useData(this.sectionService.removeData(data))
        useSectionStore.setState(({ sectionRemove: result }), false, {
            type: 'REMOVE_SECTION', data
        })
    }
}
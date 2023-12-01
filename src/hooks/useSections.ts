import toast from "react-hot-toast"
import { useMemo, useEffect } from "react"
import { Section } from "../services/sections"
import { useAPIStore } from "../stores/api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { type ProcessedSection } from "../types/sections"

const sectionService = new Section()
const TOAST_ID_QUERY = 'SECTION_TOAST_QUERY'
const TOAST_ID_MUTATE = 'SECTION_TOAST_MUTATE'

export const useSectionData = () => {
    
    const userToken = useAPIStore(state => state.userToken)
    const articleId = useAPIStore(state => state.articleId)

    const { data, isPending, isLoading, isError } = useQuery({
        queryKey: ['section', 'data', userToken, articleId],
        queryFn: ({ queryKey }) => sectionService.getData({ 
            token: queryKey[2], 
            article_id: queryKey[3]
        }),

        enabled: articleId !== '',
        staleTime: Infinity
    })

    const dataResult: ProcessedSection[] | [] = useMemo(() => {
        return data?.success ? data.result.data.map(elem => {

            return {
                id: elem.id,
                content: elem.content,
                styles: {
                    color: elem.text_color,
                    fontSize: elem.font_size, 
                    marginTop: elem.margin_top, 
                    textAlign: elem.text_align,
                    fontWeight: elem.font_weight,
                    fontFamily: elem.font_family,
                    lineHeight: elem.line_height
                } 
            }

        }) : []
    }, [data]) 

    useEffect(() => {
        
        if(isLoading) {
            toast.loading('Requesting API', { id: TOAST_ID_QUERY })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID_QUERY })
        }
        
        if(!isError && !isLoading && !isPending && !data.success) {
            toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_QUERY })
        }

        if(!isError && !isLoading && !isPending && data.success) {
            toast.success(
                `Api message: ${data.result.message}`, 
                { 
                    id: TOAST_ID_QUERY, 
                    style: { minWidth: '400px' } 
                }
            )
        } 

    }, [isPending, isLoading, isError, data])

    return {
        sectionData: dataResult
    }
}

export const useSectionDelete = () => {

    const queryClient = useQueryClient()
    const userToken = useAPIStore(state => state.userToken)
    const sectionId = useAPIStore(state => state.sectionId)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'delete'],
        mutationFn: sectionService.removeData,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '500px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const deleteSection = () => {
        mutate({ token: userToken, id: sectionId })
    }

    return {
        deleteSection,
        isPending
    }
}

export const useSectionEdit = () => {

    const queryClient = useQueryClient()

    const userToken = useAPIStore(state => state.userToken)
    const sectionId = useAPIStore(state => state.sectionId)
    const newSectionData = useAPIStore(state => state.newSectionData)
    const updateEditMode = useAPIStore(state => state.updateEditMode)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'edit'],
        mutationFn: sectionService.changeAll,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '500px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
            data.success && updateEditMode(false)
        }
    })

    const editSection = () => {
        if(!newSectionData.raw) return
        mutate({ token: userToken, id: sectionId, ...newSectionData.raw })
    }

    return {
        editSection,
        isPending
    }
}

export const useSectionAdd = () => {

    const queryClient = useQueryClient()

    const userToken = useAPIStore(state => state.userToken)
    const articleId = useAPIStore(state => state.articleId)
    const newSectionData = useAPIStore(state => state.newSectionData)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'add'],
        mutationFn: sectionService.inserNew,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '550px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const addSection = () => {
        if(!newSectionData.raw) return
        const id = Number(articleId)
        if(isNaN(id)) return 
        mutate({ token: userToken, article_id: id, ...newSectionData.raw })
    }

    return {
        addSection,
        isPending
    }
}
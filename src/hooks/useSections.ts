import toast from "react-hot-toast"
import { useMemo, useEffect, useContext } from "react"
import { UserContext } from "../context/users"
import { ArticleContext } from "../context/articles"
import { SectionContext } from "../context/sections"
import { Section } from "../services/sections"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { ContentStyles, ProcessedSection, RawSection, SectionInfo, TemplateOptions } from "../types/sections"

const sectionService = new Section()
const TOAST_ID_QUERY = 'SECTION_TOAST_QUERY'
const TOAST_ID_MUTATE = 'SECTION_TOAST_MUTATE'

export const useSectionData = () => {
    
    const { articleId } = useContext(ArticleContext)

    const { data, isPending, isLoading, isError } = useQuery({
        queryKey: ['section', 'data', articleId],
        queryFn: ({ queryKey }) => sectionService.getData({ 
            article_id: queryKey[2]
        }),

        enabled: articleId !== '',
        staleTime: Infinity
    })

    const dataResult: ProcessedSection[] | [] = useMemo(() => {
        return data?.success ? data.result.data.map(elem => {

            return {
                id: elem.id,
                sequence: elem.sequence,
                content: elem.content,
                content_type: elem.content_type,
                image: elem.image,
                styles: {
                    width: elem.width,
                    height: elem.height,
                    color: elem.text_color,
                    fontSize: elem.font_size, 
                    marginTop: elem.margin_top, 
                    textAlign: elem.text_align,
                    fontWeight: elem.font_weight,
                    fontFamily: elem.font_family,
                    lineHeight: elem.line_height,
                    borderRadius: elem.border_radius
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
        rawSectionData: data?.success ? data.result.data : [],
        sectionData: dataResult
    }
}

export const useSectionDelete = () => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { sectionId } = useContext(SectionContext)

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
        mutate({ token, id: sectionId })
    }

    return {
        deleteSection,
        isPending
    }
}

export const useSectionEdit = ({ cleanModal }: { cleanModal: () => void }) => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { sectionId } = useContext(SectionContext)

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

            data.success && cleanModal()
            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const editSection = (editedSection: ContentStyles<string>) => {

        let isImageS3
        
        const isImageS3URL = editedSection.image?.includes('https://personal-blog-bucket')
        const isImageType = editedSection.content_type.includes('image')

        if(isImageS3URL && isImageType) isImageS3 = true
        else isImageS3 = false

        const editedRawSection: RawSection<string> = {
            content: editedSection.content,
            content_type: isImageS3 ? 'image_s3' : editedSection.content_type,
            image: editedSection.image,
            width: editedSection.styles.width,
            height: editedSection.styles.height,
            text_color: editedSection.styles.color,
            font_size: editedSection.styles.fontSize, 
            margin_top: editedSection.styles.marginTop, 
            text_align: editedSection.styles.textAlign,
            font_weight: editedSection.styles.fontWeight,
            font_family: editedSection.styles.fontFamily,
            line_height: editedSection.styles.lineHeight,
            border_radius: editedSection.styles.borderRadius
        }

        mutate({ token, id: sectionId, ...editedRawSection })
    }

    return {
        editSection,
        isPending
    }
}

export const useSectionEditFile = ({ cleanModal }: { cleanModal: () => void }) => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { sectionId } = useContext(SectionContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'edit', 'file'],
        mutationFn: sectionService.changeAllFile,

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

            data.success && cleanModal()
            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const editSection = (editedSection: ContentStyles<Blob>) => {
        const editedRawSection: RawSection<Blob> = {
            content: editedSection.content,
            content_type: editedSection.content_type,
            image: editedSection.image,
            width: editedSection.styles.width,
            height: editedSection.styles.height,
            text_color: editedSection.styles.color,
            font_size: editedSection.styles.fontSize, 
            margin_top: editedSection.styles.marginTop, 
            text_align: editedSection.styles.textAlign,
            font_weight: editedSection.styles.fontWeight,
            font_family: editedSection.styles.fontFamily,
            line_height: editedSection.styles.lineHeight,
            border_radius: editedSection.styles.borderRadius
        }

        mutate({ token, id: sectionId, ...editedRawSection })
    }

    return {
        editSection,
        isPending
    }
}

export const useSectionAdd = ({ cleanModal }: { cleanModal: () => void }) => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)

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

            data.success && cleanModal()
            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const addSection = (newSection: ContentStyles<string>) => {
        const id = Number(articleId)
        if(isNaN(id)) return 

        const newRawSection: RawSection<string> = {
            content: newSection.content,
            content_type: newSection.content_type,
            image: newSection.image,
            width: newSection.styles.width,
            height: newSection.styles.height,
            text_color: newSection.styles.color,
            font_size: newSection.styles.fontSize, 
            margin_top: newSection.styles.marginTop, 
            text_align: newSection.styles.textAlign,
            font_weight: newSection.styles.fontWeight,
            font_family: newSection.styles.fontFamily,
            line_height: newSection.styles.lineHeight,
            border_radius: newSection.styles.borderRadius
        }

        mutate({ token, article_id: id, ...newRawSection })
    }

    return {
        addSection,
        isPending
    }
}

export const useSectionAddFile = ({ cleanModal }: { cleanModal: () => void }) => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'add', 'file'],
        mutationFn: sectionService.insertNewFile,

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

            data.success && cleanModal()
            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const addSection = (newSection: ContentStyles<Blob>) => {
        const id = Number(articleId)
        if(isNaN(id)) return 

        const newRawSection: RawSection<Blob> = {
            content: newSection.content,
            content_type: newSection.content_type,
            image: newSection.image,
            width: newSection.styles.width,
            height: newSection.styles.height,
            text_color: newSection.styles.color,
            font_size: newSection.styles.fontSize, 
            margin_top: newSection.styles.marginTop, 
            text_align: newSection.styles.textAlign,
            font_weight: newSection.styles.fontWeight,
            font_family: newSection.styles.fontFamily,
            line_height: newSection.styles.lineHeight,
            border_radius: newSection.styles.borderRadius
        }

        mutate({ token, article_id: id, ...newRawSection })
    }

    return {
        addSection,
        isPending
    }
}


export const useSectionAddMultiple = ({ closeModal }: { closeModal: () => void }) => {
   
    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'add', 'multiple'],
        mutationFn: sectionService.insertMultiple,

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

            data.success && closeModal()
            data.success && queryClient.invalidateQueries({ queryKey: ['section', 'data'] })
        }
    })

    const addMultipleSections = (newSections: SectionInfo['fullData'][]) => {
        const id = Number(articleId)
        if(isNaN(id)) return 

        const newMultipleSections: SectionInfo['articleIdDatas']['data'] = newSections
            .map(section => ({ ...section, article_id: id }))
        
        mutate({ data: newMultipleSections, token })
    }

    return {
        addMultipleSections,
        isPending
    }
}

export const useSectionAddTemplate = () => {
    
    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'add', 'template'],
        mutationFn: sectionService.insertTemplate,

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

    const addTemplateSections = ({ newArticleId, option }: { newArticleId: number, option: TemplateOptions }) => {
        mutate({ article_id: newArticleId, template_option: option, token })
    }

    return {
        addTemplateSections,
        isPending
    }
}

export const useSectionSequence = () => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['section', 'edit', 'sequence'],
        mutationFn: sectionService.changeSequence,

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

    const editSequences = (data: SectionInfo['idSequence'][]) => {
        mutate({ data, token })
    }

    return {
        editSequences,
        isPending
    }
}
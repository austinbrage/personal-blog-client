import toast from "react-hot-toast"
import React, { useMemo, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { Section } from "../services/sections"
import { useAPIStore } from "../stores/api"
import { type processedData } from "../types/sections"

const sectionService = new Section()
const TOAST_ID_QUERY = 'SECTION_TOAST_QUERY'
// const TOAST_ID_MUTATE = 'SECTION_TOAST_MUTATE'

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

    const dataResult: processedData[] | [] = useMemo(() => {
        return data?.success ? data.result.data.map(elem => {

            return {
                id: elem.id,
                content: elem.content,
                styles: {
                    fontSize: elem.font_size,
                    fontWeight: elem.font_weight,
                    fontFamily: elem.font_family,
                    color: elem.text_color,
                    textAlign: elem.text_align,
                    lineHeight: elem.line_height,
                } as React.CSSProperties
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
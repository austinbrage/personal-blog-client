import toast from 'react-hot-toast'
import { Article } from '../services/articles'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useAPIStore } from '../stores/api'

const articleService = new Article()
const TOAST_ID = 'ARTICLE_IDENTIFIER'

export const useArticleData = ({ shouldFetch }:{ shouldFetch: boolean }) => {

    const userToken = useAPIStore(state => state.userToken)

    const { data, isPending, isLoading, isError, refetch } = useQuery({
        queryKey: ['article', 'data', userToken],
        queryFn: ({ queryKey }) => articleService.getData({ token: queryKey[2] }),
        enabled: shouldFetch
    })

    useEffect(() => {
        
        if(isLoading) {
            toast.loading('Requesting API', { id: TOAST_ID })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID })
        }
        
        if(!isError && !isLoading && !isPending && !data.success) {
            toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID })
        }

        if(!isError && !isLoading && !isPending && data.success) {
            toast.success(
                `Api message: ${data.result.message}`, 
                { 
                    id: TOAST_ID, 
                    style: { minWidth: '360px' } 
                }
            )
        } 

    }, [isPending, isLoading, isError, data])

    return {
        articleData: data,
        refetchArticles: refetch
    }
}
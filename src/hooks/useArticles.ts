import toast from 'react-hot-toast'
import { Article } from '../services/articles'
import { useEffect, useContext } from 'react'
import { UserContext } from '../context/users'
import { ArticleContext } from '../context/articles'
import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { type ArticleInfo } from '../types/articles'

const articleService = new Article()
const TOAST_ID_QUERY = 'ARTICLE_TOAST_QUERY'
const TOAST_ID_MUTATE = 'ARTICLE_TOAST_MUTATE'

type ArticleAdd = { 
    cleanModal: () => void, 
    addTemplate: (newArticleId: number) => void 
}

type TransformedData = {
    [category: string]: { id: number; keyword: string }[];
}

export const useArticleKeywords = () => {

    const { data } = useQuery({
        staleTime: Infinity,
        queryKey: ['article', 'keywords'],
        queryFn: articleService.getKeywords
    })

    const transformData = (acc: TransformedData, item: ArticleInfo['idKeywords']) => {
        
        const { id, keyword, category } = item

        acc[category] = acc[category] || []
        acc[category].push({ id, keyword })

        acc[category].sort((a,b) => a.keyword.length - b.keyword.length)

        return acc
    }

    const getCategories = (item: ArticleInfo['idKeywords'][]) => {
        return [...new Set(item.map(elem => elem.category))]
    }

    return {
        availableKeywords: data?.success ? data.result.data : null,
        availableCategories: data?.success ? getCategories(data.result.data) : null,
        orderedKeywords: data?.success ? data.result.data.reduce(transformData, {}) : {}
    }
}

export const useArticleKeywordData = ({ perPage, currentPage, keywords }: ArticleInfo['pageKeywords']) => {

    const  { data, isPending, isLoading, isError, refetch, fetchNextPage } = useInfiniteQuery({
        queryKey: ['article', 'page', 'keywordData', keywords],
        queryFn: ({ pageParam, queryKey }) => articleService.getDataByKeywords({
            perPage, 
            currentPage: pageParam,
            keywords: Array.isArray(queryKey[3]) ? queryKey[3] : [] 
        }),
        getNextPageParam: (lastPage, _, lastPageParam) => (
            lastPage.success 
                ? lastPage.result.currentPage + 1 
                : lastPageParam
        ),
        initialPageParam: currentPage,
        enabled: keywords.length > 0
    })

    useEffect(() => {

        if(isLoading) {
            toast.loading('Requesting API', { id: TOAST_ID_QUERY })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID_QUERY })
        }

        if(!isError && !isLoading && !isPending) {
            const lastData = data?.pages[data?.pages.length - 1]

            lastData.success
                ?   lastData.result.data.length !== 0
                        ?   toast.success(
                                `Api message: ${lastData.result.message}`, 
                                { 
                                    id: TOAST_ID_QUERY, 
                                    style: { minWidth: '360px' } 
                                }
                            )
                        :   toast.success(
                                `No more published articles available`, 
                                { 
                                    id: TOAST_ID_QUERY, 
                                    style: { minWidth: '360px' } 
                                }
                            )         
                :   toast.error(`Api message: ${lastData.error.message}`,  
                        { 
                            id: TOAST_ID_QUERY, 
                            style: { minWidth: '380px' } 
                        }
                    )
        }

    }, [isPending, isLoading, isError, data])
    
    return {
        articleDataFilter: data?.pages.map(page => page.success ? page.result.data : []).flat(2) ?? [],
        fetchNextArticlesFilter: fetchNextPage,
        refetchArticlesFilter:   refetch
    }
}

export const useArticleAllData = ({ perPage, currentPage }: ArticleInfo['pageNoCondition']) => {

    const  { data, isPending, isLoading, isError, refetch, fetchNextPage } = useInfiniteQuery({
        queryKey: ['article', 'page', 'allData'],
        queryFn: ({ pageParam }) => articleService.getEverything({
            perPage, 
            currentPage: pageParam
        }),
        getNextPageParam: (lastPage, _, lastPageParam) => (
            lastPage.success 
                ? lastPage.result.currentPage + 1 
                : lastPageParam
        ),
        initialPageParam: currentPage
    })

    useEffect(() => {

        if(isLoading) {
            toast.loading('Requesting API', { id: TOAST_ID_QUERY })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID_QUERY })
        }

        if(!isError && !isLoading && !isPending) {
            const lastData = data?.pages[data?.pages.length - 1]

            lastData.success
                ?   lastData.result.data.length !== 0
                        ?   toast.success(
                                `Api message: ${lastData.result.message}`, 
                                { 
                                    id: TOAST_ID_QUERY, 
                                    style: { minWidth: '360px' } 
                                }
                            )
                        :   toast.success(
                                `No more published articles available`, 
                                { 
                                    id: TOAST_ID_QUERY, 
                                    style: { minWidth: '360px' } 
                                }
                            )         
                :   toast.error(`Api message: ${lastData.error.message}`,  
                        { 
                            id: TOAST_ID_QUERY, 
                            style: { minWidth: '380px' } 
                        }
                    )
        }

    }, [isPending, isLoading, isError, data])

    return {
        articleData: data?.pages.map(page => page.success ? page.result.data : []).flat(2) ?? [],
        fetchNextArticles: fetchNextPage,
        refetchArticles:   refetch
    }
}

export const useArticleData = () => {

    const { token } = useContext(UserContext)

    const { data, isPending, isLoading, isError, refetch } = useQuery({
        queryKey: ['article', 'data', token],
        queryFn: ({ queryKey }) => articleService.getData({ token: queryKey[2] }),
        staleTime: Infinity
    })

    useEffect(() => {
        
        if(isLoading) {
            toast.loading('Requesting API', { id: TOAST_ID_QUERY })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID_QUERY })
        }
        
        if(!isError && !isLoading && !isPending && !data.success) {
            toast.error(`Api message: ${data.error.message}`,  
                { 
                    id: TOAST_ID_QUERY, 
                    style: { minWidth: '380px' } 
                }
            )
        }

        if(!isError && !isLoading && !isPending && data.success) {
            toast.success(
                `Api message: ${data.result.message}`, 
                { 
                    id: TOAST_ID_QUERY, 
                    style: { minWidth: '360px' } 
                }
            )
        } 

    }, [isPending, isLoading, isError, data])

    return {
        articleData: data?.success ? data.result.data : [],
        refetchArticles: refetch
    }
}

export const useArticleAdd = ({ cleanModal, addTemplate }: ArticleAdd) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { token } = useContext(UserContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['article', 'addNew'],
        mutationFn: articleService.insertNew,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data, variables) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '400px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            if(data.success) {
                const newArticleId = data.result.data[0].insertId

                cleanModal()
                addTemplate(newArticleId)
                navigate(`/dashboard/edit/${variables.name.replace(/\s/g, "-")}`)
                queryClient.invalidateQueries({ queryKey: ['article', 'data'] })
            }

        }
    })    

    const addNewArticle = (data: Omit<ArticleInfo['data'], "token">) => {
        mutate({ token, ...data })
    }

    return {
        addNewArticle,
        isPending
    }
}

export const useArticleDelete = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    
    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['article', 'delete'],
        mutationFn: articleService.removeData,

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
                        style: { minWidth: '400px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && navigate('/dashboard/create/new-article')
            data.success && queryClient.invalidateQueries({ queryKey: ['article', 'data'] })
        }
    })

    const deleteArticle = () => {
        const id = Number(articleId)
        if(isNaN(id)) return 

        mutate({ id, token })
    }

    return {
        deleteArticle,
        isPending
    }
}

export const useArticleEdit = ({ cleanModal }: { cleanModal: () => void }) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['article', 'edit'],
        mutationFn: articleService.changeData,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data, variables) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '400px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && cleanModal()
            data.success && navigate(`/dashboard/edit/${variables.name.replace(/\s/g, "-")}`)
            data.success && queryClient.invalidateQueries({ queryKey: ['article', 'data'] })
        }
    })

    const editArticle = (data: Omit<ArticleInfo['data'], "token">) => {
        const id = Number(articleId)
        if(isNaN(id)) return 

        let image_type
        
        const isImageS3URL = data.image?.includes('https://personal-blog-bucket')

        if(isImageS3URL) image_type = 'image_s3'
        else image_type = 'image_url'

        mutate({ id, token, image_type, ...data })
    }

    return {
        editArticle,
        isPending
    }
}

export const useArticleEditFile = ({ cleanModal }: { cleanModal: () => void }) => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['article', 'edit', 'file'],
        mutationFn: articleService.changeDataFile,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data, variables) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '400px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && cleanModal()
            data.success && navigate(`/dashboard/edit/${variables.name.replace(/\s/g, "-")}`)
            data.success && queryClient.invalidateQueries({ queryKey: ['article', 'data'] })
        }
    })

    const editArticle = (data: Omit<ArticleInfo['dataFile'], "token">) => {
        const id = Number(articleId)
        if(isNaN(id)) return 
        mutate({ id, token, ...data })
    }

    return {
        editArticle,
        isPending
    }
}

export const useArticlePublish = () => {

    const queryClient = useQueryClient()

    const { token } = useContext(UserContext)
    const { articleId } = useContext(ArticleContext)

    const { mutate, isPending } = useMutation({
        mutationKey: ['article', 'publish'],
        mutationFn: articleService.changePublishment,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_QUERY })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_QUERY })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(
                    `Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_QUERY, 
                        style: { minWidth: '450px' } 
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_QUERY })

            data.success && queryClient.invalidateQueries({ queryKey: ['article', 'data'] })
        }
    })

    const publishArticle = (data: Pick<ArticleInfo['idPublishment'], "is_publish">) => {
        const id = Number(articleId)
        if(isNaN(id)) return 
        mutate({ id, token, is_publish: data.is_publish })
    }

    return {
        publishArticle,
        isPending
    }
}
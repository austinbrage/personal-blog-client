import { useState, useEffect } from 'react'

export const useMenuTablePagination = (postsLists: string[]) => {

    const perPage = 3
    const totalPages = Math.ceil(postsLists.length / perPage)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mustPaginate, setMustPaginate] = useState<boolean>(false)
    
    const goNextPage = () => setCurrentPage(prev => prev + 1)
    const goPrevPage = () => setCurrentPage(prev => prev - 1)

    const hasNext = () => currentPage < totalPages
    const hasPrev = () => currentPage > 1

    useEffect(() => {
        postsLists.length > perPage
            ? setMustPaginate(true)
            : setMustPaginate(false)
    }, [postsLists, setMustPaginate])

    return { currentPage, mustPaginate, goNextPage, goPrevPage, hasNext, hasPrev, perPage, totalPages }
}
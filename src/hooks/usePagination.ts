import { useState, useEffect } from 'react'

type MenuTablePagination = {
    postsList: string[]
    perPage: number
}

export const useMenuTablePagination = ({ postsList, perPage }: MenuTablePagination) => {

    const totalPages = Math.ceil(postsList.length / perPage)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [mustPaginate, setMustPaginate] = useState<boolean>(false)
    
    const goNextPage = () => setCurrentPage(prev => prev + 1)
    const goPrevPage = () => setCurrentPage(prev => prev - 1)

    const hasNext = () => currentPage < totalPages
    const hasPrev = () => currentPage > 1

    useEffect(() => {
        postsList.length > perPage
            ? setMustPaginate(true)
            : setMustPaginate(false)
    }, [postsList, perPage, setMustPaginate])

    return { currentPage, mustPaginate, goNextPage, goPrevPage, hasNext, hasPrev, perPage, totalPages }
}
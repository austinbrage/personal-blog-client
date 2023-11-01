import { useState, useEffect } from 'react'
import { type APIResponse } from '../types/api'

export const useData = <T>(request: Promise<APIResponse<T>>) => {
    const [data, setData] = useState<T[] | []>([])
    const [message, setMessage] = useState<string>('')
    const [hasFail, setHasFail] = useState<string>('')
    const [hasError, setHasError] = useState<unknown>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setHasError(false)
        setIsLoading(true)

        request
            .then(res => {
                if(res.success) {
                    setData(res.result.data || [])
                    setMessage(res.result.message)
                } else if (res.error.status === 'fail'){
                    setHasFail(res.error.message)
                } else {
                    process.env.NODE_ENV !== 'production' 
                        && console.log(res.error.message)
                    throw new Error('Internal Server Error')
                }
            })
            .catch(err => {
                setHasError(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [request])

    return {
        data,
        message,
        hasFail,
        hasError,
        isLoading
    }
}
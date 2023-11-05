import { useState, useEffect, useCallback } from 'react'
import { type APIResponse } from '../types/api'

export const useData = <T>(request: Promise<APIResponse<T>>) => {
    const [data, setData] = useState<T[] | []>([])
    const [message, setMessage] = useState<string>('')
    const [hasFail, setHasFail] = useState<string>('')
    const [success, setSuccess] = useState<boolean>(false)
    const [hasError, setHasError] = useState<unknown>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasAttempted, setHasAttempted] = useState<boolean>(false)

    const makeRequest = useCallback(() => {
        setHasFail('')
        setSuccess(false)
        setHasError(null)
        setIsLoading(true)

        request
            .then(res => {
                if(res.success) {
                    setSuccess(true)
                    setData(res.result.data || [])
                    setMessage(res.result.message)
                    return
                } 
                
                if (res.error.status === 'fail'){
                    setSuccess(false)
                    setHasFail(res.error.message)
                    return
                }

                process.env.NODE_ENV !== 'production' && console.log(res.error.message)
                throw new Error('Internal Server Error')
            })
            .catch(err => {
                setHasError(err)
            })
            .finally(() => {
                setIsLoading(false)
                setHasAttempted(true)
            })
    }, [request])

    useEffect(() => {
        hasAttempted || makeRequest()
    }, [makeRequest, hasAttempted])

    return {
        data,
        success,
        message,
        hasFail,
        hasError,
        isLoading,
        reFetch: makeRequest
    }
}
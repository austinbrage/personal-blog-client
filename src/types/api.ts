type ErrorResponse = {
    success: false
    error: {
        status: 'fail' | 'error',
        message: string
        validationError: object
    }
}

type OkResponse<T> = {
    success: true
    result: { 
        message: string 
        data: T extends null ? null : Array<T> 
        token: T extends 'token' ? string : null
        currentPage: T extends Array<object> ? number : null  
    } 
}

export type APIResponse<T> = ErrorResponse | OkResponse<T>
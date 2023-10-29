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
        message: string,
        data?: Array<T>
    }
}

export type APIResponse<T> = ErrorResponse | OkResponse<T>
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
        // data: Array<T>
    } 
}

// type OkResponse<T> = {
//     success: true
//     result: T extends null
//         ? { message: string }
//         : { message: string; data: Array<T> } 
// }

export type APIResponse<T> = ErrorResponse | OkResponse<T>
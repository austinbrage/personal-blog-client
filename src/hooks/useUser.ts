import toast from 'react-hot-toast'
import { User } from '../services/users'
import { useMutation } from '@tanstack/react-query'

const useService = new User()
const TOAST_ID = 'USER_IDENTIFIER'

export const useValidation = () => {

    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'validate'],
        mutationFn: useService.validate,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(`Api message: ${data.result.message}`, { id: TOAST_ID })
                : toast.error(  `Api message: ${data.error.message}`,  { id: TOAST_ID })
        }
    })   

    return {
        signIn: mutate,
        isPending
    }
}

export const useRegister = () => {

    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'register'],
        mutationFn: useService.insertNew,

        onMutate: () => {
          toast.loading('Requesting API', { id: TOAST_ID })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(`Api message: ${data.result.message}`, { id: TOAST_ID })
                : toast.error(  `Api message: ${data.error.message}`,  { id: TOAST_ID })
        }
    })

    return {
        signUp: mutate,
        isPending
    }
}
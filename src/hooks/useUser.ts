import toast from 'react-hot-toast'
import { User } from '../services/users'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAPIStore } from '../stores/api'

const useService = new User()
const TOAST_ID = 'USER_IDENTIFIER'

export const useValidation = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)
    const updateUserSession = useAPIStore(state => state.updateUserSession)
    
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

            data.success && updateUserToken(data.result.token)
            data.success && updateUserSession('onSession')
            data.success && navigate('/dashboard/create/new-article')
        }
    })   

    return {
        signIn: mutate,
        isPending
    }
}

export const useRegister = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)
    const updateUserSession = useAPIStore(state => state.updateUserSession)

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
                ? toast.success(`Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID, 
                        style: { minWidth: '360px' }
                    }
                )
                : toast.error(  `Api message: ${data.error.message}`,  { id: TOAST_ID })

            data.success && updateUserToken(data.result.token)
            data.success && updateUserSession('onSession')
            data.success && navigate('/dashboard')
        }
    })

    return {
        signUp: mutate,
        isPending
    }
}
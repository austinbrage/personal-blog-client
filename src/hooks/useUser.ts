import toast from 'react-hot-toast'
import { User } from '../services/users'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAPIStore } from '../stores/api'
import { useQuery, useMutation } from '@tanstack/react-query'

const userService = new User()
const TOAST_ID = 'USER_IDENTIFIER'

export const useValidation = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)
    const updateUserSession = useAPIStore(state => state.updateUserSession)
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'validate'],
        mutationFn: userService.validate,

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
        mutationFn: userService.insertNew,

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

export const useUserData = () => {

    const userToken = useAPIStore(state => state.userToken)

    const { data, isPending, isLoading, isError, refetch } = useQuery({
        queryKey: ['user', 'data', userToken],
        queryFn: ({ queryKey }) => userService.getData({ token: queryKey[2] }),
        staleTime: Infinity
    })

    useEffect(() => {
        
        if(isLoading) {
            toast.loading('Requesting API', { id: TOAST_ID })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID })
        }
        
        if(!isError && !isLoading && !isPending && !data.success) {
            toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID })
        }

        if(!isError && !isLoading && !isPending && data.success) {
            toast.success(`Api message: ${data.result.message}`, { id: TOAST_ID })
        } 

    }, [isPending, isLoading, isError, data])

    return {
        userData: data?.success ? data.result.data[0] : null,
        refetchUser: refetch
    }
}
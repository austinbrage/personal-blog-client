import toast from 'react-hot-toast'
import { User } from '../services/users'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAPIStore } from '../stores/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { UserInfo } from '../types/users'

const userService = new User()
const TOAST_ID_QUERY = 'USER_TOAST_QUERY'
const TOAST_ID_MUTATE = 'USER_TOAST_MUTATE'

export const useValidation = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)
    const updateUserSession = useAPIStore(state => state.updateUserSession)
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'validate'],
        mutationFn: userService.validate,

        onMutate: () => {
            toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(`Api message: ${data.result.message}`, { id: TOAST_ID_MUTATE })
                : toast.error(  `Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

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
          toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(`Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '360px' }
                    }
                )
                : toast.error(  `Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

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
            toast.loading('Requesting API', { id: TOAST_ID_QUERY })
        }
        
        if(isError) {
            toast.error('Internal error, please try again', { id: TOAST_ID_QUERY })
        }
        
        if(!isError && !isLoading && !isPending && !data.success) {
            toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_QUERY })
        }

        if(!isError && !isLoading && !isPending && data.success) {
            toast.success(`Api message: ${data.result.message}`, { id: TOAST_ID_QUERY })
        } 

    }, [isPending, isLoading, isError, data])

    return {
        userData: data?.success ? data.result.data[0] : null,
        refetchUser: refetch
    }
}

export const useUserName = () => {

    const queryClient = useQueryClient()
    const userToken = useAPIStore(state => state.userToken)
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'editName'],
        mutationFn: userService.changeName,

        onMutate: () => {
          toast.loading('Requesting API', { id: TOAST_ID_MUTATE })
        },
        onError: () => {
            toast.error('Internal error, please try again', { id: TOAST_ID_MUTATE })
        },
        onSuccess: async (data) => {
            data.success
                ? toast.success(`Api message: ${data.result.message}`, 
                    { 
                        id: TOAST_ID_MUTATE, 
                        style: { minWidth: '400px' }
                    }
                )
                : toast.error(  `Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['user', 'data'] })
        }
    })

    const editUserName = (data: Omit<UserInfo['name'], "token">) => {
        mutate({ token: userToken, name: data.name })
    }

    return {
        editUserName,
        isPending
    }
}
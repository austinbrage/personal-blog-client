import toast from 'react-hot-toast'
import { User } from '../services/users'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAPIStore } from '../stores/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { type UserInfo } from '../types/users'

const userService = new User()
const TOAST_ID_QUERY = 'USER_TOAST_QUERY'
const TOAST_ID_MUTATE = 'USER_TOAST_MUTATE'

export const useValidation = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)
    
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
            data.success && navigate('/dashboard/create/new-article')
        }
    })   

    return {
        signIn: mutate,
        isPending
    }
}

export const useOpenAuth = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)

    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'open', 'auth'],
        mutationFn: userService.openAuth,

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
            data.success && navigate('/dashboard/create/new-article')
        }
    })   

    return {
        signOA: mutate,
        isPending
    }
}

export const useRegister = () => {

    const navigate = useNavigate()
    const updateUserToken = useAPIStore(state => state.updateUserToken)

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
            data.success && navigate('/dashboard/create/new-article')
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
            toast.error(`Api message: ${data.error.message}`,  
                { 
                    id: TOAST_ID_QUERY, 
                    style: { minWidth: '380px' } 
                }
            )
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
    
    const { mutate, isPending, data } = useMutation({
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
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['user', 'data'] })
        }
    })

    const editUserName = (data: Omit<UserInfo['name'], "token">) => {
        mutate({ token: userToken, name: data.name })
    }

    return {
        editUserName,
        isPending,
        isSuccess: data?.success
    }
}

export const useUserEmail = () => {

    const queryClient = useQueryClient()
    const userToken = useAPIStore(state => state.userToken)
    
    const { mutate, isPending, data } = useMutation({
        mutationKey: ['user', 'editEmail'],
        mutationFn: userService.changeEmail,

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
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['user', 'data'] })
        }
    })

    const editUserEmail = (data: Omit<UserInfo['email'], "token">) => {
        mutate({ token: userToken, email: data.email })
    }

    return {
        editUserEmail,
        isPending,
        isSuccess: data?.success
    }
}

export const useUserAuthor = () => {

    const queryClient = useQueryClient()
    const userToken = useAPIStore(state => state.userToken)
    
    const { mutate, isPending, data } = useMutation({
        mutationKey: ['user', 'editAuthor'],
        mutationFn: userService.changeAuthor,

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
                        style: { minWidth: '450px' }
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && queryClient.invalidateQueries({ queryKey: ['user', 'data'] })
        }
    })

    const editUserAuthor = (data: Omit<UserInfo['author'], "token">) => {
        mutate({ token: userToken, author: data.author })
    }

    return {
        editUserAuthor,
        isPending,
        isSuccess: data?.success
    }
}

export const useUserPassword = () => {

    const userToken = useAPIStore(state => state.userToken)
    
    const { mutate, isPending, data } = useMutation({
        mutationKey: ['user', 'editPassword'],
        mutationFn: userService.changePassword,

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
                        style: { minWidth: '450px' }
                    }
                )
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })
        }
    })

    const editUserPassword = (data: Omit<UserInfo['password'], "token">) => {
        mutate({ token: userToken, password: data.password })
    }

    return {
        editUserPassword,
        isPending,
        isSuccess: data?.success
    }
}

export const useUserDelete = () => {

    const navigate = useNavigate()
    const userToken = useAPIStore(state => state.userToken)
    
    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'remove'],
        mutationFn: userService.removeData,

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
                : toast.error(`Api message: ${data.error.message}`,  { id: TOAST_ID_MUTATE })

            data.success && navigate('/')
        }
    })

    const deleteUser = () => {
        mutate({ token: userToken })
    }

    return {
        deleteUser,
        isPending
    }
}
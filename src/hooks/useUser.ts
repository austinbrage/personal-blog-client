import { useEffect } from 'react'
import { User } from "../services/users"
import { useData } from './useData'
import { useAPIStore } from "../stores/api"
import { type UserInfo } from "../types/users"

const userService = new User()

export const useUserValidation = (data: UserInfo['credentials']) => {
    const userSession = useAPIStore(state => state.userSession)
    const updateUserSession = useAPIStore(state => state.updateUserSession)

    const result = useData(userService.validate(data))

    useEffect(() => {
        if(result.success) updateUserSession('onSession') 
    }, [result, updateUserSession])

    return {
        ...result,
        userSession 
    }
}   
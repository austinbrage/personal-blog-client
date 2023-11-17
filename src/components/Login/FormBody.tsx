import React from 'react'
import { useValidation, useRegister } from '../../hooks/useUser'
import { CommonInputs, SignUpInputs } from './FormInputs'

type Props = {
    isSignUp: boolean
    toggleSignUp: () => void
}

export function FormBody({ isSignUp, toggleSignUp }: Props) {

    const { isPending: loadingSignIn, signIn } = useValidation()
    const { isPending: loadingSignUp, signUp } = useRegister()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()
        if(loadingSignIn || loadingSignUp) return

        const getStringValue = (key: string): string => {
            const data = new FormData(event.currentTarget) 
            return data.get(key)?.toString() ?? ''
        }

        const signInData = {
            name: getStringValue('name'),
            password: getStringValue('password'),
        }
        const signUpData = {
            ...signInData,
            author: getStringValue('author'),
            email: getStringValue('email')
        }

        isSignUp ? signUp(signUpData) : signIn(signInData)
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                
                <CommonInputs/>
                {isSignUp && <SignUpInputs/>}

                {isSignUp || (
                    <div className='text-right text-gray-400 hover:underline hover:text-gray-100'>
                        <a href="#">Forgot password?</a>
                    </div>
                )}

                <div className='px-4 pb-2 pt-4'>
                    <button type='submit' className='text-md lg:text-lg text-slate-800 uppercase block tracking-widest font-extrabold w-full p-4 rounded-full bg-gradient-to-r from-slate-300 to-slate-500'>
                        {isSignUp ? 'Register account' : 'Enter into account'}
                    </button>
                    <button type='button' onClick={() => toggleSignUp()} className='block text-md lg:text-lg lg:hidden text-slate-800 uppercase tracking-widest font-extrabold w-full mt-3 p-4 text-lg rounded-full bg-gradient-to-r from-violet-200 to-pink-200'>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                </div>

            </form>
        </>
    )
}
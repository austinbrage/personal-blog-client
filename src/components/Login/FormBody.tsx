import toast from 'react-hot-toast'
import React, { type ReactNode } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useValidation, useRegister, useOpenAuth } from '../../hooks/useUser'
import { CommonInputs, SignUpInputs } from './FormInputs'

type Props = {
    isSignUp: boolean
    toggleSignUp: () => void
    children: ReactNode
}

export function FormBody({ isSignUp, toggleSignUp, children }: Props) {

    const { isPending: loadingSignIn, signIn } = useValidation()
    const { isPending: loadingSignUp, signUp } = useRegister()
    const { isPending: loadingSignOA, signOA } = useOpenAuth()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        
        event.preventDefault()
        if(loadingSignIn || loadingSignUp) return

        const getStringValue = (key: string): string => {
            const data = new FormData(event.currentTarget) 
            return data.get(key)?.toString() ?? ''
        }

        const signInData = {
            name: getStringValue('name'),
            password: getStringValue('password1'),
        }
        const signUpData = {
            ...signInData,
            author: getStringValue('name'),
            email: getStringValue('email')
        }

        if(isSignUp) {
            const password1 = getStringValue('password1')
            const password2 = getStringValue('password2')
            if(password1 !== password2) return toast.error('Passwords do not match')
        }
        
        isSignUp ? signUp(signUpData) : signIn(signInData)
    }

    const googleOAuth = useGoogleLogin({
        onSuccess: async (credentials) => {
            if(!loadingSignOA) signOA({ auth_provider: 'google', code: credentials.code }) 
        },
        onError: () => {
            toast.error('Failed google open auth, please try again')
        },
        flow: 'auth-code'
    })

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                
                <CommonInputs/>
                {isSignUp && <SignUpInputs/>}

                {/* {isSignUp || (
                        <div className='text-right text-gray-400 hover:underline hover:text-gray-100'>
                            <a href="#">Forgot password?</a>
                        </div>
                    )} */}

                <div className='flex items-center justify-center'>
                    
                    <button 
                        type='button'
                        onClick={() => googleOAuth()}
                        className="float-right max-w-xs flex text-sm leading-5 font-bold text-center align-middle items-center border gap-3 text-[#c4d2dc] bg-[#19242b] cursor-pointer transition-all duration-[0.25s] ease-[cubic-bezier(0,0.87,0.12,1)] px-[1.4rem] py-2 rounded-lg border-solid border-[rgba(255,255,255,0.25)] hover:scale-[1.025] active:scale-[0.975]"
                    >
                        <svg
                            viewBox="0 0 256 262"
                            className='h-6 w-auto'
                            preserveAspectRatio="xMidYMid"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                fill="#4285F4"
                            ></path>
                            <path
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                fill="#34A853"
                            ></path>
                            <path
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                fill="#FBBC05"
                            ></path>
                            <path
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                fill="#EB4335"
                            ></path>
                        </svg>
                        Continue with Google
                    </button>  

                </div>

                <div className={`px-4 pb-0 pt-4 ${isSignUp ? 'h-16' : 'h-auto'}`}>
                    <button type='submit' className='text-md lg:text-lg text-slate-800 uppercase block tracking-widest font-extrabold w-full p-4 rounded-full bg-gradient-to-r from-slate-300 to-slate-500'>
                        {isSignUp ? 'Register account' : 'Enter into account'}
                    </button>
                    <button type='button' onClick={() => toggleSignUp()} className='block text-md lg:text-lg lg:hidden text-slate-800 uppercase tracking-widest font-extrabold w-full mt-3 p-4 text-lg rounded-full bg-gradient-to-r from-violet-200 to-pink-200'>
                        {isSignUp ? 'Sign In' : 'Sign Up'}
                    </button>
                    {children}
                </div>

            </form>
        </>
    )
}
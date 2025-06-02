'use client'

import Link from 'next/link'
import Button from '../components/Button'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/navigation'


export default function LoginForm(){

    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage('')

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            setMessage('Login failed: ' + error.message)
        } else {
            setMessage('Login successful!')
            router.push('/')
        }

    }

    return (
        <div className='flex flex-col items-center h-80 space-y-2 bg-gray-900 justify-center mt-auto mb-auto font-revalia pt-2 pb-2 border-amber-700 rounded border-2 border-l-0 border-r-0 w-80 ml-auto mr-auto'>
            <form 
                className='flex flex-col space-y-2 justify-center items-center'
                onSubmit={handleLogin}
            >
                <h1>Enter your email</h1>
                <input
                    type='text' 
                    placeholder='example@gamelist.com' 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='text-center' 
                />
                <h1>Enter your password</h1>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='text-center'
                />
                <Button
                    type='submit'
                >
                    Log in
                </Button>
                {message && <p className='text-red-600 text-center'>{message}</p>}
            </form>
            <p className='mt-4'>Don't have an account yet?</p>
            <Link href={'/signup'} className='hover:scale-110 hover:text-amber-700 ease-in-out duration-150'>Sign up now!</Link>
        </div>
    )

}
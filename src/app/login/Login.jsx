'use client'

import Link from 'next/link'
import Button from '../components/Button'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    const handleLogin = async (e) => {
        e.preventDefault()
        setMessage('')

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage('Login failed: ' + error.message)
        } else {
            setMessage('Login successful!')
            router.push('/')
        }
    }

    return (
        <div className="font-revalia mt-auto mr-auto mb-auto ml-auto flex h-80 w-80 flex-col items-center justify-center space-y-2 rounded border-2 border-r-0 border-l-0 border-amber-700 bg-gray-900 pt-2 pb-2">
            <form
                className="flex flex-col items-center justify-center space-y-2"
                onSubmit={handleLogin}
            >
                <h1>Enter your email</h1>
                <input
                    type="text"
                    placeholder="example@gamelist.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-center"
                />
                <h1>Enter your password</h1>
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-center"
                />
                <Button type="submit">Log in</Button>
                {message && (
                    <p className="text-center text-red-600">{message}</p>
                )}
            </form>
            <p className="mt-4">Don&apos;t have an account yet?</p>
            <Link
                href={'/signup'}
                className="duration-150 ease-in-out hover:scale-110 hover:text-amber-700"
            >
                Sign up now!
            </Link>
        </div>
    )
}

'use client'

import { supabase } from '../utils/supabaseClient'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Filter } from 'bad-words'
import Button from '../components/Button'

export default function SignUpForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const router = useRouter()
    const filter = new Filter()

    const handleSignup = async (e) => {
        e.preventDefault()
        setMessage('')

        const { data: existing } = await supabase
            .from('profiles')
            .select('id')
            .eq('username', username)
            .single()

        if (existing) {
            setMessage('This username is already being used')
            return
        }

        if (filter.isProfane(username)) {
            setMessage('Your username is containing inappropriate language')
            return
        }

        const { data: authData, error: signUpError } =
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        display_name: username,
                    },
                },
            })

        if (signUpError) {
            setMessage(`Signup failed: ${signUpError.message}`)
            return
        }

        const userId = authData.user?.id

        const { error: profileError } = await supabase
            .from('profiles')
            .insert([{ id: userId, username }])

        if (profileError) {
            setMessage('Failed to save profile: ' + profileError.message)
        } else {
            setMessage('Successfully signed up!')
            router.push('/')
        }
    }

    return (
        <div className="font-revalia mt-auto mb-auto flex max-h-140 items-center justify-center">
            <form
                onSubmit={handleSignup}
                className="flex max-w-140 flex-col justify-center space-y-0 rounded border-2 border-r-0 border-l-0 border-amber-600 bg-gray-900 p-8 text-center"
            >
                <h1>
                    <strong>Create new account</strong>
                </h1>
                <hr />
                <h2>Enter your username</h2>
                <input
                    className="text-center"
                    name="username"
                    type="text"
                    placeholder="Arthas"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <br />
                <h3>Enter valid email</h3>
                <input
                    className="text-center"
                    type="email"
                    name="email"
                    placeholder="example@gamelist.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <h4>Enter your password</h4>
                <input
                    className="text-center"
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <Button type="submit">Sign up</Button>
                {message && <p className="text-red-600">{message}</p>}
            </form>
        </div>
    )
}

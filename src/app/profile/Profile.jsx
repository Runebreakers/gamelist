'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import toast from 'react-hot-toast'

export default function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession()
            setUser(session?.user || null)
        }

        fetchUser()

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null)
        })

        return () => {
            data?.subscription.unsubscribe()
        }
    }, [])

    if (!user) {
        toast.error('You have to log in first')
    }

    return (
        <div>
            <h1>Welcome, {user?.user_metadata?.display_name}</h1>
        </div>
    )
}
